const express = require("express");
const router = express.Router();
const db = require("./dbConnection");
const path = require("path");
const jwt = require("jsonwebtoken");
const checktoken = require("./validation/check_token");
const checkrole = require("./validation/check_role");
const fs = require("fs");
const vismapController = require("./controllers/vismap");
const visdata = require("./controllers/vis_res.js");
const makechart = require("./controllers/make_chart");
const plotly = require("plotly");

router.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "sign-up.html"));
});

router.post("/register", (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE LOWER(username) = LOWER(${db.escape(
      req.body.email
    )});`,
    (err, result) => {
      if (result.length !== 0) {
        return res.status(409).send({
          msg: "This user is already in use!",
        });
      } else {
        // username is available
        db.query(
          `INSERT INTO users (username, password, user_level_id) VALUES (${db.escape(
            req.body.email
          )}, '${req.body.password}', '0')`,
          (err, result) => {
            try {
              if (err) {
                throw err;
              }
              res.redirect("/api/login");
            } catch (error) {
              return res.status(400).send({ msg: error });
            }
          }
        );
      }
    }
  );
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "sign-in.html"));
});

router.post("/login", async (req, res, next) => {
  try {
    db.query(
      `SELECT * FROM users WHERE LOWER(username) = LOWER(${db.escape(
        req.body.email
      )});`,
      (err, result) => {
        if (result.length === 0) {
          return res.status(409).send({
            msg: "This user does not exist",
          });
        }
        const user = result[0];

        if (req.body.password === user.password) {
          const token = jwt.sign(
            { email: user.username, role: user.user_level_id },
            "the-super-strong-secret",
            { expiresIn: "1h" }
          );

          res.cookie("token", token, {
            secure: req.secure,
            maxAge: 3600000,
            httpOnly: true,
          }); // Set cookie to expire in 1 hour

          if (user.user_level_id === "-1") {
            res.redirect("/api/admin/home");
          } else {
            res.redirect("/api/home");
          }
        } else {
          return res.status(401).send({
            msg: "Email or password is incorrect!",
          });
        }
      }
    );
  } catch (err) {
    next(err);
  }
});

router.get("/home", checktoken, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "copy of index1.html"));
});

router.get("/admin/home", checktoken, checkrole, (req, res) => {
  res.render("slugtable");
});

router.get("/dashboard", checktoken, (req, res) => {
  const email = req.decoded.email;
  visdata.get_vis_data(email, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "An error occurred" });
    }

    visdata.get_vis_chart_data(result, (err, finalresult) => {
      if (err) {
        return res.status(500).json({ error: "An error occurred" });
      }

      // Sort the chart data based on the sequence number
      finalresult.sort((a, b) => a.sequenceNumber - b.sequenceNumber);

      const chartResults = [];
      // const columnSet = [];
      // JSON array to store chart results
      
      // Use async/await to handle asynchronous calls
      const processCharts = async () => {
        for (const visualization of finalresult) {
          
          const visualizationId = visualization.slug_name;
          const title_name = visualization.title_tag;
          
          // const seqNum = visualization.sequenceNumber;
          const viewResults = visualization.viewResult;
          const chartType = visualization.chart_type_slug;

          try {
            makechart.create_chart(
              viewResults,
              visualizationId,
              title_name,
              chartType,
              (chartResult, err) => {
                if (err) {
                  console.error("An error occurred while creating chart:", err);
                } else {
                  chartResults.push(chartResult);
                }
              }
            );
          } catch (err) {
            console.error("An error occurred while creating chart:", err);
          }
        }

        // Send the JSON array to the frontend
        // res.render("dashboard", { chartResults, columnSet });
        res.render("dash", { chartResults });
      };

      // Invoke the async function to process charts
      processCharts();
    });
  });
});

router.get("/configuration", checktoken, (req, res) => {
  const query = "SELECT title FROM visualization WHERE isActive = 'Yes'";
  db.query(query, (err, results) => {
    if (err) throw err;

    const viewNames = results.map((row) => row[Object.keys(row)[0]]);

    const chartTypesQuery =
      "SELECT visualization_id, chart_type_normal FROM chart_types";
    db.query(chartTypesQuery, (err, chartTypesResults) => {
      if (err) throw err;
      
      // Create an empty dictionary
      const chartTypesDict = {};

      // Iterate over the chart types query results
      chartTypesResults.forEach((row) => {
        const visualizationId = row.visualization_id;
        const chartType = row.chart_type_normal;

        // Check if the visualization ID already exists in the dictionary
        if (chartTypesDict.hasOwnProperty(visualizationId)) {
          // If it exists, append the new chart type to the existing list
          chartTypesDict[visualizationId].push(chartType);
        } else {
          // If it doesn't exist, create a new list with the chart type
          chartTypesDict[visualizationId] = [chartType];
        }
      });

      // Send both viewNames and chartTypesDict to the frontend
      res.render("configurations", {
        title: "Visualization Mapping",
        viewNames,
        chartTypesDict,
      });
    });
  });
});

router.post(
  "/configuration/action",
  checktoken,
  function (request, response, next) {
    var action = request.body.action;

    if (action == "fetch") {
      var emailid = request.decoded.email;
      var query = `SELECT * FROM visualization_mapping where userid = '${emailid}'`;
      db.query(query, function (error, data) {
        if (error) {
          // Handle error here
          console.error(error);
          response.status(500).json({
            error: "Internal server error",
          });
        } else {
          var visualizationIds = data.map((item) => item.visualizationId);
          var visualizationQuery = `SELECT id, title FROM visualization WHERE id IN (${visualizationIds.join(
            ","
          )})`;
          db.query(visualizationQuery, function (error, visualizationData) {
            if (error) {
              // Handle error here
              console.error(error);
              response.status(500).json({
                error: "Internal server error",
              });
            } else {
              // Map visualization data to respective visualizationId
              var visualizationMap = {};
              visualizationData.forEach((item) => {
                visualizationMap[item.id] = item.title;
              });

              // Add titles to the data
              var modifiedData = data.map((item) => {
                return {
                  ...item,
                  title: visualizationMap[item.visualizationId],
                };
              });
              
              response.json({
                data: modifiedData,
              });
            }
          });
        }
      });
    }

    if (action == "Add") {
     
      var visualizationId = request.body.visualizationId;
      var charttype = request.body.chartType;
      var columns = request.body.columns;
      var sequenceNumber = request.body.sequenceNumber;
      var isActive = request.body.isActive;
      var emailid = request.decoded.email;
      
      var find_vis_id = `SELECT id FROM visualization WHERE title = "${visualizationId}"`;
      var find_chart_name = `SELECT chart_type_slug FROM chart_types WHERE visualization_id = "${visualizationId}" and chart_type_normal = "${charttype}"`;
      db.query(find_vis_id, function (error, res_id) {
        
        vis_num = res_id[0]["id"];
        db.query(find_chart_name, function (err, res_chart_name) {
          chart_name = res_chart_name[0]["chart_type_slug"];
          
          var query = `
          INSERT INTO visualization_mapping 
          (visualizationId, columns, sequenceNumber, isActive, chart_type_slug, chart_type_normal, userid) 
          VALUES ("${vis_num}", "${columns}", "${sequenceNumber}", "${isActive}", "${chart_name}", "${charttype}", "${emailid}")
          `;

          db.query(query, function (error, data) {
            
            response.json({
              message: "Data Added",
            });
          });
        });
      });
    }

    if (action === "fetch_single") {
      var id = request.body.id;

      var query = `SELECT * FROM visualization_mapping WHERE id = "${id}"`;

      db.query(query, function (error, data) {
        if (error) {
          console.error(error);
          response.status(500).json({
            error: "Internal server error",
          });
        } else {
          
          var visid = data[0].visualizationId;

          var visualizationQuery = `SELECT title FROM visualization WHERE id = "${visid}"`;
          db.query(visualizationQuery, function (error, visualizationData) {
            if (error) {
              console.error(error);
              response.status(500).json({
                error: "Internal server error",
              });
            } else {
              data[0].title = visualizationData[0].title;
              response.json(data[0]);
            }
          });
        }
      });
    }

    if (action == "Edit") {
      var id = request.body.id;
      var visualizationId = request.body.visualizationId;
      var charttype = request.body.chartType;
      var columns = request.body.columns;
      var sequenceNumber = request.body.sequenceNumber;
      var isActive = request.body.isActive;
      var visualizationQuery = `SELECT id FROM visualization WHERE title = "${visualizationId}"`;
      db.query(visualizationQuery, function (error, visualizationData) {
        if (error) {
          console.error(error);
          response.status(500).json({
            error: "Internal server error",
          });
        } else {
          var visid = visualizationData[0]["id"];
          var chartDictionary = {
            "Bar Chart": "bar_chart",
            "Pie Chart": "pie_chart",
            "Bubble Chart": "bubble_chart",
            "Line Chart": "line_chart",
            "Scatter Plot": "scatter_plot",
            "Histogram": "histogram",
            "Key Value": "key_value",
            "Dot Plot": "dot_plot",
            "Table": "table",
          };
          chart_slug = chartDictionary[charttype];

          var query = `
              UPDATE visualization_mapping 
              SET visualizationId = "${visid}",
              chart_type_normal = "${charttype}", 
              chart_type_slug = "${chart_slug}",
              columns = "${columns}", 
              sequenceNumber = "${sequenceNumber}", 
              isActive = "${isActive}" 
              WHERE id = "${id}"
              `;

          db.query(query, function (error, data) {
            response.json({
              message: "Data Edited",
            });
          });
        }
      });
    }

    if (action == "delete") {
      var id = request.body.id;

      var query = `DELETE FROM visualization_mapping WHERE id = "${id}"`;

      db.query(query, function (error, data) {
        response.json({
          message: "Data Deleted",
        });
      });
    }
  }
);

router.get("/admin/slug", function (request, response, next) {
  response.render("slugtable", { title: "Visualization Slug Table" });
});

router.post("/admin/slug/action", function (request, response, next) {
  var action = request.body.action;
  if (action == "fetch") {
    var query = "SELECT * FROM visualization";
    db.query(query, function (error, data) {
      response.json({
        data: data,
      });
    });
  }

  if (action == "Add") {
    var slug = request.body.slug;
    var title = request.body.title;
    var description = request.body.description;
    var isActive = request.body.isActive;

    var query = `
          INSERT INTO visualization 
          (slug, title, description, isActive) 
          VALUES ("${slug}", "${title}", "${description}", "${isActive}")
          `;

    db.query(query, function (error, data) {
      response.json({
        message: "Data Added",
      });
    });
  }

  if (action == "fetch_single") {
    var id = request.body.id;

    var query = `SELECT * FROM visualization WHERE id = "${id}"`;

    db.query(query, function (error, data) {
      // Convert the isActive value to Yes or No based on the database value
      data[0].isActive = data[0].isActive === "Yes" ? "Yes" : "No";
      response.json(data[0]);
    });
  }

  if (action == "Edit") {
    var id = request.body.id;
    var slug = request.body.slug;
    var title = request.body.title;
    var description = request.body.description;
    var isActive = request.body.isActive;

    var query = `
          UPDATE visualization 
          SET slug = "${slug}",
          title = "${title}",
          description = "${description}", 
          isActive = "${isActive}" 
          WHERE id = "${id}"
          `;

    db.query(query, function (error, data) {
      response.json({
        message: "Data Edited",
      });
    });
  }

  if (action == "delete") {
    var id = request.body.id;

    var query = `DELETE FROM visualization WHERE id = "${id}"`;

    db.query(query, function (error, data) {
      response.json({
        message: "Data Deleted",
      });
    });
  }
});

router.get("/visualization-mapping", checktoken, checkrole, (req, res) => {
  res.sendFile(path.join(__dirname, "templates", "vismap.html"));
});

router.post("/visualization-mapping", checktoken, (req, res) => {
  if (req.body.formId === "form1") {
    // Process Form 1
    const { field1, field2, field3, field4 } = req.body;
    vismapController.processForm1(
      field1,
      field2,
      field3,
      field4,
      (error, results) => {
        if (error) {
          return res.status(500).send("Error inserting data");
        }
      }
    );
  } else if (req.body.formId === "form2") {
    // Process Form 2
    const { field1, field2, field3, field4 } = req.body;
    const condition = ""; // Define your condition
    vismapController.processForm2(
      field1,
      field2,
      field3,
      field4,
      condition,
      (error, results) => {
        if (error) {
          return res.status(500).send("Error updating data");
        }
      }
    );
  } else {
    return res.status(500).send("Error getting form data");
  }
});

router.get("/chart", (req, res) => {
  res.sendFile(path.join(__dirname, "templates", "trial_signup.html"));
});

router.post("/chart", (req, res, next) => {
  const { visualization_id, chart_type_slug, chart_type_normal } = req.body;

  const sql = `INSERT INTO chart_types (visualization_id, chart_type_slug, chart_type_normal)
               VALUES (?, ?, ?)`;
  const values = [visualization_id, chart_type_slug, chart_type_normal];

  db.query(sql, values, (error, results) => {
    if (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Error inserting data into chart_types table" });
    } else {
      res.redirect("/api/chart");
    }
  });
});

module.exports = router;
