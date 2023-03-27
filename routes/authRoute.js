const authRoute = require("express").Router();
const { AuthController } = require("../controllers");

authRoute.get("/register", AuthController.showRegisterPage);
authRoute.get("/login", AuthController.showLoginPage);
authRoute.post("/register", AuthController.register);
authRoute.post("/login", AuthController.login);
authRoute.get("/logout", AuthController.logout);

module.exports = authRoute;
