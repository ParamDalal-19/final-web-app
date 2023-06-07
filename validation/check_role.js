const db = require('../dbConnection'); // Import your database module

const isAdmin = (req, res, next) => {
  try {
    const email = req.decoded.email;

    // Query the database to find the user based on the email
    db.query(
      `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(email)});`,
      (err, result) => {
        if (result.length === 0) {
          return res.status(409).send({
            msg: 'This user does not exist'
          });
        }
        const user = result[0];

        // Check if the user's role is "admin"
        if (user.role === 'admin') {
          // Role is admin, proceed to the next middleware or route handler
          next();
        } else {
          // Role is not admin, return an unauthorized response
          return res.status(401).send({
            msg: 'Unauthorized'
          });
        }
      }
    );
  } catch (err) {
    next(err);
  }
};

module.exports = isAdmin;
