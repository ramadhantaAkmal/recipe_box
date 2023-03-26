const userRoute = require("express").Router();
const { UserController } = require("../controllers");
const Authorization = require("../middleware/auth")

userRoute.get("/:id", UserController.detailUser)
userRoute.post("/:id", UserController.updateUser )

module.exports = userRoute;
