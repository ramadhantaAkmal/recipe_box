const { user } = require("../models");
const bcrypt = require("bcryptjs/dist/bcrypt");
class UserController {
  static async detailUser(req, res) {
    try {
      const data = {
        id: req.user_id,
        username: req.username,
      };
      let userData = await user.findByPk(req.user_id);
      userData.password = "aaaaaa";
      // res.json(userData)
      res.render("users/profilePage.ejs", { userData, data });
    } catch (error) {
      res.json(error);
    }
  }

  static async updateUser(req, res) {
    try {
      const id = +req.user_id;
      const { username, email } = req.body;

      let { password } = req.body;

      password = await bcrypt.hash(password, 10);

      let result = await user.update(
        {
          username,
          email,
          password,
        },
        {
          where: {
            id,
          },
        }
      );

      // result[0] === 1
      //   ? res.json({
      //     message: "Berhasil Update"
      //   })
      //   : res.json({
      //       message: `Profile not updated`,
      //     });

      result[0] === 1
        ? res.redirect("/users")
        : res.json({
            message: `Profile not updated`,
          });
    } catch (error) {
      res.json(error);
    }
  }
}

module.exports = UserController;
