const { Router } = require("express");
const categoryRoute = Router();
const { CategoryController } = require("../controllers");

categoryRoute.get("/", CategoryController.getCategories);
categoryRoute.post("/create", CategoryController.create);
categoryRoute.get("/delete/:id", CategoryController.delete)

module.exports = categoryRoute;