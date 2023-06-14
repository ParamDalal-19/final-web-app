const { json } = require("express");
const db = require("../dbConnection");

const executeQuery = (query) => {
  return new Promise((resolve, reject) => {
    db.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.get_vis_data = (email, callback) => {
  try {
    const useremail = email;
    const query = `SELECT * FROM visualization_mapping WHERE userid = "${useremail}"`;
    db.query(query, (err, result) => {
      if (err) {
        console.log("Error executing SQL query:", err);
        callback(err);
      } else {
        callback(null, result);
      }
    });
  } catch (err) {
    console.log(err);
    callback("Error occurred");
  }
};

exports.get_vis_chart_data = async (result, callback) => {
  try {
    const jsonData = result;
    console.log(jsonData[0].visualizationId, "test");

    const matchedSlugs = [];

    for (let i = 0; i < jsonData.length; i++) {
      const title = jsonData[i].visualizationId;
      console.log(title);
      try {
        const query = `SELECT slug FROM visualization WHERE title = '${title}'`;
        const abc = await executeQuery(query);
        if (abc.length > 0) {
          const slug = abc[0].slug;
          matchedSlugs.push(slug);
        }
      } catch (error) {
        console.error("Error executing SQL query:", error);
        // Handle the error appropriately (e.g., logging, returning an error response)
      }
    }

    const getViewResults = async (visualizationId) => {
      try {
        const query = `SELECT * FROM ${visualizationId}`;
        const result = await executeQuery(query);
        return result;
      } catch (err) {
        console.error(
          `Error fetching view results for visualization_id ${visualizationId}:`,
          err
        );
        throw err;
      }
    };

    const updatedData = [];

    for (let i = 0; i < matchedSlugs.length; i++) {
      const slug = matchedSlugs[i];
      try {
        const viewResults = await getViewResults(slug);
        updatedData.push({ slug, view_results: viewResults });
      } catch (err) {
        console.error(`Error fetching view results for slug ${slug}:`, err);
        updatedData.push({ slug, view_results: [] });
      }
    }

    callback(null, updatedData);
  } catch (err) {
    console.error("Error processing data:", err);
    callback(err);
  }
};

// const { json } = require("express");
// const db = require("../dbConnection");

// // get type of chart
// exports.get_vis_data = (email, callback) => {
//   try {
//     // console.log('here 3')
//     const useremail = email;
//     // console.log(useremail)
//     const query = `SELECT * FROM visualization_mapping WHERE userid = "${useremail}"`;
//     // console.log(query);
//     db.query(query, (err, result) => {
//       if (err) {
//         console.log("here 1");
//         callback(err);
//       } else {
//         // console.log('result mil gaya :-',result);
//         callback(null, result);
//       }
//     });
//   } catch (err) {
//     console.log(err);
//     callback("error aa gaya");
//   }
// };

// exports.get_vis_chart_data = (result, callback) => {
//   // Assuming you have the JSON data stored in a variable called 'jsonData'
//   const jsonData = result;
//   console.log(jsonData[0].visualizationId, "test");
//   //change here
//   const matchedSlugs = [];

//   // Iterate over the titles array
//   for (let i = 0; i < jsonData.length; i++) {
//     const title = jsonData[i].visualizationId;
//     console.log(title);
//     // SQL query to fetch the Slug column based on the Title value
//     const abc = db.query(
//       `SELECT slug FROM visualization WHERE title = '${title}'`,
//       (error, results) => {
//         if (error) {
//           console.error("Error executing SQL query:", error);
//           // Handle the error appropriately (e.g., logging, returning an error response)
//           return;
//         }
//       }
//     );
//     // Execute the query
//     // If a matching Slug is found, add it to the matchedSlugs array
//     if (abc.recordset.length > 0) {
//       const slug = abc.recordset[0].Slug;
//       matchedSlugs.push(slug);
//     }
//   }

//   // console.log("data is here :-",jsonData);
//   // Function to fetch view results for a given visualization_id
//   const getViewResults = (visualizationId) => {
//     // Perform your database query here to fetch the view results based on the visualization_id
//     // Return a promise that resolves with the view results
//     return new Promise((resolve, reject) => {
//       // console.log("i am here :-", visualizationId);
//       db.query(`SELECT * FROM ${visualizationId}`, (err, result) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(result);
//         }
//       });
//     });
//   };

//   // Iterate over each object in the JSON array
//   Promise.all(
//     matchedSlugs.map(async (item) => {
//       try {
//         // Fetch view results for the current visualization_id
//         const viewResults = await getViewResults(item.visualizationId);

//         // Add the view results to the current object
//         item.view_results = viewResults;

//         return item;
//       } catch (err) {
//         // Handle any errors that occur during the process
//         console.error(
//           `Error fetching view results for visualization_id ${item.visualization_id}:`,
//           err
//         );
//         return item; // Return the object without view_results if an error occurs
//       }
//     })
//   )
//     .then((updatedData) => {
//       // 'updatedData' will now contain the original JSON data with the added view_results property
//       callback(null, updatedData);
//     })
//     .catch((err) => {
//       // Handle any errors that occur during the process
//       console.error("Error processing data:", err);
//       callback(err);
//     });
// };
