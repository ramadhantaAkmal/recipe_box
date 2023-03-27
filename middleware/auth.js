const jwt = require("jsonwebtoken");

const config = process.env;

class Authorization {
  static verifyToken(req, res, next) {
    try {
      // const bearerHeader = req.headers["authorization"];
      const bearerHeader = req.cookies.authorization;
      const bearer = bearerHeader.split(" ");

      if (typeof bearerHeader !== "undefined" && bearer[0] === "Bearer") {
        const bearerToken = bearer[1];
        const decoded = jwt.verify(bearerToken, config.TOKEN_KEY);
        // console.log(decoded.user_id)
        req.user_id = decoded.user_id;
        return next();
      } else {
        return res.status(401).json({ message: "Token cannot be null" });
      }
    } catch (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }
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
