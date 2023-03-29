const userRoute = require("express").Router();
const { UserController } = require("../controllers");

userRoute.get("/", UserController.detailUser)
userRoute.post("/", UserController.updateUser )

module.exports = userRoute;
