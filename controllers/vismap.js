const db = require('../dbConnection');


// Function to process Form 1
exports.processForm1 = (field1, field2, field3, field4, callback) => {
    const query = "INSERT INTO your_table (field1, field2, field3, field4) VALUES (?, ?, ?, ?)";
    const values = [field1, field2, field3, field4];
    
    db.query(query, values, (error, results) => {
      if (error) {
        console.error("Error inserting data:", error);
        return callback(error, null);
      }
    
      console.log("Data inserted:", results);
      return callback(null, results);
    });    
};

// Function to process Form 2
exports.processForm2 = (field1, field2, field3, field4, condition, callback) => {
    const query = "UPDATE your_table SET field1 = ?, field2 = ?, field3 = ?, field4 = ? WHERE condition = ?";
    const values = [field1, field2, field3, field4, condition];
    
    db.query(query, values, (error, results) => {
      if (error) {
        console.error("Error updating data:", error);
        return callback(error, null);
      }
    
      console.log("Data updated:", results);
      return callback(null, results);
    });    
};
