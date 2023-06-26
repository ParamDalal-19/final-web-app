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
  const jsonData = result;
  console.log("data is here:", jsonData);

  // Iterate over the titles array
  for (let i = 0; i < jsonData.length; i++) {
    const title_name = jsonData[i].visualizationId;
    console.log("slug_name:", title_name);
    const query = `SELECT * FROM visualization WHERE title = ${db.escape(
      title_name
    )}`;
    console.log("query:", query);

    // Wrap the db.query inside a Promise to make it awaitable
    const dbQueryPromise = new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) {
          console.log("Error in db.query");
          reject(err);
        } else {
          console.log("Result received:", result);
          if (result.length > 0) {
            const slug = result[0].slug;
            jsonData[i].slug_name = slug;
            console.log("updated json data :-", jsonData);
          }
          resolve();
        }
      });
    });

    // Wait for the dbQueryPromise to resolve before proceeding to the next iteration
    await dbQueryPromise;
  }

  const getViewResults = (visualizationId) => {
    return new Promise((resolve, reject) => {
      console.log("ID USED FOR VIEW :-", visualizationId);
      //   comd = `SELECT * FROM ${visualizationId}`
      //   console.log("command :-",comd);
      db.query(`SELECT * FROM ${visualizationId}`, (err, result) => {
        if (err) {
          console.log("THIS IS THE ERROR :-", err);
          reject(err);
        } else {
          console.log("GOT THE RESULT");
          console.log(result);
          resolve(result);
        }
      });
    });
  };

  Promise.all(
    jsonData.map(async (item) => {
      try {
        console.log("Promise entered");
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
  )
    .then((updatedData) => {
      console.log("updatedData:", updatedData);
      callback(null, updatedData);
    })
    .catch((err) => {
      console.error("Error processing data:", err);
      callback(err);
    });
};
