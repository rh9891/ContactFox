// Function that has access to the request and response cycle/object. Every time that an endpoint is hit, the middleware can be fired off.

const jwt = require("jsonwebtoken");
const config = require("config");

// The next function is called to move on to the next middleware.
module.exports = function (req, res, next) {
  // Gets the token from the header.
  const token = req.header("x-auth-token");
  // Checks to see if the token doesn't exist.
  if (!token) {
    return res.status(401).json({ msg: "No token. Authorization denied." });
  }

  try {
    // Verifies token by checking the payload.
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    // Sets the decoded user of the payload to req.user, so that we have access to the user information inside the route.
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid." });
  }
};
