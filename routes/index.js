const route = require("express").Router();
const Authorization = require("../middleware/auth");

// route.get("/", Authorization.verifyToken, (req, res) => {
//   res.render("dashboard.ejs");
//   // res.send("Test homepage");
// });

const authRoutes = require("./authRoute");
const userRoutes = require("./userRoute");
const recipeRoutes = require("./recipeRoute");

route.use("", authRoutes);
route.use("/users", Authorization.verifyToken, userRoutes);
// route.use("/recipes", recipeRoutes);
route.use("/recipes", Authorization.verifyToken, recipeRoutes);

module.exports = route;
