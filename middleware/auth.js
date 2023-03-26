const jwt = require("jsonwebtoken");

const config = process.env;

class Authorization {
  static verifyToken(req, res, next) {
    try {
      const bearerHeader = req.headers["authorization"];

      if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        const decoded = jwt.verify(bearerToken, config.TOKEN_KEY);
        req.user = decoded;
      } else {
        return res.status(401).json({ message: "Token cannot be null" });
      }
    } catch (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    return next();
  }

  static userAuthorization(req, res, next) {
    try {
    } catch (error) {}
  }

  static recipeAuthorization(req, res, next) {
    try {
    } catch (error) {}
  }
}

module.exports = Authorization;
