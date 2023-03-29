const { Router } = require("express");
const recipeCategoryRoute = Router();
const { RecipeCategoryController } = require("../controllers");

recipeCategoryRoute.get("/", RecipeCategoryController.getRC);
recipeCategoryRoute.post("/create", RecipeCategoryController.create);
recipeCategoryRoute.post("/update", RecipeCategoryController.update);


module.exports = recipeCategoryRoute;