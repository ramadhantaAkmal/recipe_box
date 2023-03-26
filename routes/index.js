const route = require("express").Router();
const Authorization = require("../middleware/auth");

route.get("/", (req, res) => {
  res.send("Test homepage");
});

const authRoutes = require("./authRoute");
const userRoutes = require("./userRoute");
const recipeRoutes = require("./recipeRoute");

route.use("/auth", authRoutes);
route.use("/users", Authorization.verifyToken, userRoutes);
route.use("/recipes", Authorization.verifyToken, recipeRoutes);

module.exports = route;
