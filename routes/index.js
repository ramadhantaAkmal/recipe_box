const route = require("express").Router();

route.get("/", (req, res) => {
  res.send("Test homepage");
});

const authRoutes = require("./authRoute");
const userRoutes = require("./userRoute");
const recipeRoutes = require("./recipeRoute");

route.use("/auth", authRoutes);
route.use("/users", userRoutes);
route.use("/recipes", recipeRoutes);

module.exports = route;
