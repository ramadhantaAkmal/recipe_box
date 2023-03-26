const recipeRoute = require("express").Router();
const { RecipeController } = require("../controllers");
const Authorization = require("../middleware/auth")

recipeRoute.get("/", Authorization.verifyToken, RecipeController.listRecipe);
recipeRoute.post("/", Authorization.verifyToken, RecipeController.addRecipes);
recipeRoute.get("/:id", Authorization.verifyToken, RecipeController.getRecipeByID);
recipeRoute.get("/delete/:id", Authorization.verifyToken, RecipeController.deleteRecipe);
recipeRoute.post("/update/:id", Authorization.verifyToken, RecipeController.updateRecipe);

module.exports = recipeRoute;
