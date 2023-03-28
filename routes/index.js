const route = require("express").Router();
const Authorization = require("../middleware/auth");

<<<<<<< HEAD
route.get("/", (req, res) => {
  res.json({
    message: "Companies and Products",
  });
  // res.render('index.ejs');
});
=======
// route.get("/", Authorization.verifyToken, (req, res) => {
//   res.render("dashboard.ejs");
//   // res.send("Test homepage");
// });
>>>>>>> 82d843ea2cd5a22cdde3b6562c72829006550b55

const authRoutes = require("./authRoute");
const userRoutes = require("./userRoute");
const recipeRoutes = require("./recipeRoute");
const categoryRoutes = require("./categoryRoutes");
const ingredientRoutes = require("./ingredientRoutes");
const recipeCategoryRoutes = require("./recipeCategoryRoutes");

route.use("", authRoutes);
route.use("/users", Authorization.verifyToken, userRoutes);
route.use("/recipes", recipeRoutes);
route.use("/categories", categoryRoutes);
route.use("/ingredients", ingredientRoutes);
route.use("/rc", recipeCategoryRoutes);
route.use("/recipes", Authorization.verifyToken, recipeRoutes);

module.exports = route;
