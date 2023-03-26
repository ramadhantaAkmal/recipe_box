const route = require("express").Router();
const Authorization = require("../middleware/auth");

route.get("/", (req, res) => {
  res.json({
    message: "Companies and Products",
  });
  // res.render('index.ejs');
});

const authRoutes = require("./authRoute");
const userRoutes = require("./userRoute");
const recipeRoutes = require("./recipeRoute");
const categoryRoutes = require("./categoryRoutes");
const ingredientRoutes = require("./ingredientRoutes");
const recipeCategoryRoutes = require("./recipeCategoryRoutes");

route.use("/auth", authRoutes);
route.use("/users", Authorization.verifyToken, userRoutes);
route.use("/recipes", recipeRoutes);
route.use("/categories", categoryRoutes);
route.use("/ingredients", ingredientRoutes);
route.use("/rc", recipeCategoryRoutes);
route.use("/recipes", Authorization.verifyToken, recipeRoutes);

module.exports = route;
