const express = require("express");
const route = express.Router();

route.get("/", (req, res) => {
  res.json({
    message: "Companies and Products",
  });
  // res.render('index.ejs');
});

const categoryRoutes = require("./categoryRoutes");
const ingredientRoutes = require("./ingredientRoutes");
const recipeCategoryRoutes = require("./recipeCategoryRoutes");

route.use("/categories", categoryRoutes);
route.use("/ingredients", ingredientRoutes);
route.use("/rc", recipeCategoryRoutes);

module.exports = route;
