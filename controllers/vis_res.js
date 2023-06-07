const db = require('../dbConnection');

// get type of chart
exports.get_vis_data = (email, callback) => {
    try {
        console.log('here 3')
        const useremail = email
        console.log(useremail)
        db.query(`SELECT * FROM visualization_mapping WHERE userid = "${useremail}"`, (err, result) => {
            if (err) {
                console.log('here 1')
                callback(err);
            } else {
                console.log('result mil gaya');
                callback(null, result);
            }
        });
    } catch (err) {
        console.log(err)
        callback("error aa gaya");
    }
};


exports.get_vis_chart_data = (result, callback) => {
    // Assuming you have the JSON data stored in a variable called 'jsonData'
    const jsonData = result;
    // Function to fetch view results for a given visualization_id
    const getViewResults = (visualizationId) => {
        // Perform your database query here to fetch the view results based on the visualization_id
        // Return a promise that resolves with the view results
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM ${visualizationId}`, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    };

    // Iterate over each object in the JSON array
    Promise.all(jsonData.map(async (item) => {
        try {
            // Fetch view results for the current visualization_id
            const viewResults = await getViewResults(item.visualization_id);

            // Add the view results to the current object
            item.view_results = viewResults;

            return item;
        } catch (err) {
            // Handle any errors that occur during the process
            console.error(`Error fetching view results for visualization_id ${item.visualization_id}:`, err);
            return item; // Return the object without view_results if an error occurs
        }
    }))
    .then((updatedData) => {
        // 'updatedData' will now contain the original JSON data with the added view_results property
        callback(null, updatedData);
    })
    .catch((err) => {
        // Handle any errors that occur during the process
        console.error('Error processing data:', err);
        callback(err);
    });
};


exports.make_chart = (finalresult, callback) => {
    
};