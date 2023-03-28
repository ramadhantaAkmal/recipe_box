const userRoute = require("express").Router();
const { UserController } = require("../controllers");

userRoute.get("/:id", UserController.detailUser)
userRoute.post("/:id", UserController.updateUser )

module.exports = userRoute;
