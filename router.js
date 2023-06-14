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
  res.sendFile(path.join(__dirname, "templates", "trial_signup.html"));
});

router.post("/register", (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(
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
          `INSERT INTO users (name, email, password) VALUES ('${
            req.body.username
          }', ${db.escape(req.body.email)}, '${req.body.password}')`,
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
  res.sendFile(path.join(__dirname, "templates", "trial_loginpage.html"));
});

router.post("/login", async (req, res, next) => {
  try {
    db.query(
      `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(
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
            { email: user.email, role: user.role },
            "the-super-strong-secret",
            { expiresIn: "1h" }
          );

          res.cookie("token", token, {
            secure: req.secure,
            maxAge: 3600000,
            httpOnly: true,
          }); // Set cookie to expire in 1 hour

          if (user.role === "admin") {
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
  res.sendFile(path.join(__dirname, "templates", "home.html"));
});

router.get("/admin/home", checktoken, checkrole, (req, res) => {
  res.sendFile(path.join(__dirname, "templates", "admin_home.html"));
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

      const chartResults = []; // JSON array to store chart results

      // Use async/await to handle asynchronous calls
      const processCharts = async () => {
        for (const visualization of finalresult) {
          const visualizationId = visualization.visualizationId;
          const viewResults = visualization.view_results;
          const chartType = visualization.chart_type;
          // console.log("check this out :-", visualizationId, viewResults, chartType);

          try {
            makechart.create_chart(
              viewResults,
              visualizationId,
              chartType,
              (chartResult, err) => {
                if (err) {
                  console.log("ERROR :- ", err);
                  console.log("chartresult :- ", chartResult);
                  console.error("An error occurred while creating chart:", err);
                } else {
                  console.log("push k pehle chart result", chartResults);
                  console.log("result bahar mila aur abb push karunga");
                  chartResults.push(chartResult);
                  console.log("push ho gaya");
                  console.log("puch k bad chart result", chartResults);
                }
              }
            );
          } catch (err) {
            console.error("An error occurred while creating chart:", err);
          }
        }
        //   console.log("chart ke result :-",chartResults)
        //   stringyf = JSON.stringify(chartResults)
        //   console.log("stringyfy :- ",stringyf)
        //   pars = JSON.parse(stringyf)
        //   console.log("parse wala :- ",pars)
        // Send the JSON array to the frontend
        // res.render('dashboard', { chartResults });
        res.json(chartResults);
      };

      // Invoke the async function to process charts
      processCharts();
    });
  });
});

router.get("/configuration", checktoken, (req, res) => {
  // const query = 'SHOW FULL TABLES WHERE Table_type = "VIEW"';
  const query = "SELECT title FROM visualization WHERE isActive = 'Yes'";
  db.query(query, (err, results) => {
    if (err) throw err;
    console.log(results)
    const viewNames = results.map((row) => row[Object.keys(row)[0]]);
    res.render("config", { title: "Visualization Mapping", viewNames });
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
        response.json({
          data: data,
        });
      });
    }

    if (action == "Add") {
      var visualizationId = request.body.visualizationId;
      var columns = request.body.columns;
      var sequenceNumber = request.body.sequenceNumber;
      var isActive = request.body.isActive;
      var emailid = request.decoded.email;

      var query = `
          INSERT INTO visualization_mapping 
          (visualizationId, columns, sequenceNumber, isActive, userid) 
          VALUES ("${visualizationId}", "${columns}", "${sequenceNumber}", "${isActive}", "${emailid}")
          `;

      db.query(query, function (error, data) {
        response.json({
          message: "Data Added",
        });
      });
    }

    if (action == "fetch_single") {
      var id = request.body.id;

      var query = `SELECT * FROM visualization_mapping WHERE id = "${id}"`;

      db.query(query, function (error, data) {
        response.json(data[0]);
      });
    }

    if (action == "Edit") {
      var id = request.body.id;
      var visualizationId = request.body.visualizationId;
      var columns = request.body.columns;
      var sequenceNumber = request.body.sequenceNumber;
      var isActive = request.body.isActive;

      var query = `
          UPDATE visualization_mapping 
          SET visualizationId = "${visualizationId}", 
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
  response.render("slug", { title: "Visualization Slug Table" });
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

module.exports = router;
