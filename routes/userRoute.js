const userRoute = require("express").Router();
const { UserController } = require("../controllers");
const Authorization = require("../middleware/auth")

userRoute.get("/", Authorization.verifyToken, UserController.detailUser)
// userRoute.put("/", )

module.exports = userRoute;
