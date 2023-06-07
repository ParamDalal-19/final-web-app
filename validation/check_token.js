const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // Extract the token from the request cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).send({
        msg: 'Unauthorized'
      });
    }

    // Verify the token
    jwt.verify(token, 'the-super-strong-secret', (err, decoded) => {
      if (err) {
        return res.status(401).send({
          msg: 'Unauthorized'
        });
      }

      // Store the decoded token in req.decoded
      req.decoded = decoded;

      // Call the next middleware or route handler
      next();
    });
  } catch (err) {
    next(err);
  }
};
