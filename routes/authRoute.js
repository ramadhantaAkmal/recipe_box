const authRoute = require("express").Router();
const { AuthController, RecipeController } = require("../controllers");
const Authorization = require("../middleware/auth");

authRoute.get("/register", AuthController.showRegisterPage);
authRoute.get("/login", AuthController.showLoginPage);
authRoute.post("/register", AuthController.register);
authRoute.post("/login", AuthController.login);
authRoute.get("/logout", AuthController.logout);
authRoute.get("/", RecipeController.listRecipe);
authRoute.get("/home", Authorization.verifyToken, RecipeController.listRecipe);

module.exports = authRoute;
