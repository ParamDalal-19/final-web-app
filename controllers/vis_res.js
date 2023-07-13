const { json } = require("express");
const db = require("../dbConnection");

// get type of chart
exports.get_vis_data = (email, callback) => {
  try {
    // console.log('here 3')
    const useremail = email;
    // console.log(useremail)
    const query = `SELECT * FROM visualization_mapping WHERE userid = "${useremail}" and isActive = "Yes"`;
    // console.log(query);
    db.query(query, (err, result) => {
      if (err) {
        // console.log("here 1");
        callback(err);
      } else {
        // console.log('result mil gaya :-',result);
        callback(null, result);
      }
    });
  } catch (err) {
    console.log(err);
    callback("error aa gaya");
  }
};

exports.get_vis_chart_data = async (result, callback) => {
  try {
    const jsonData = result;

    for (let i = 0; i < jsonData.length; i++) {
      const title_id = jsonData[i].visualizationId;

      const find_vis_id = `SELECT title FROM visualization WHERE id = "${title_id}"`;

      const res_id = await new Promise((resolve, reject) => {
        db.query(find_vis_id, (error, res) => {
          if (error) {
            reject(error);
          } else {
            resolve(res);
          }
        });
      });

      const title_name = res_id[0]["title"];

      const query = `SELECT * FROM visualization WHERE title = ${db.escape(
        title_name
      )}`;

      const result = await new Promise((resolve, reject) => {
        db.query(query, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      });

      if (result.length > 0) {
        const slug = result[0].slug;
        const title = result[0].title;
        jsonData[i].slug_name = slug;
        jsonData[i].title_tag = title;
      }
    }

    const getViewResults = (visualizationId) => {
      return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM ${visualizationId}`, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      });
    };

    const updatedData = await Promise.all(
      jsonData.map(async (item) => {
        try {
          const viewResults = await getViewResults(item.slug_name);
          item.viewResult = viewResults;
          return item;
        } catch (err) {
          console.error(
            `Error fetching view results for visualization_id ${item}:`,
            err
          );
          return item;
        }
      })
    );
    callback(null, updatedData);
  } catch (err) {
    console.error("Error processing data:", err);
    callback(err);
  }
};
