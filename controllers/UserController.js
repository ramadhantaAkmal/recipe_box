const { user } = require("../models");
const bcrypt = require("bcryptjs/dist/bcrypt");
class UserController {
  static async detailUser(req, res) {
    try {
      const id = +req.params.id;
      let users = await user.findByPk(id);
      res.json(users);
    } catch (error) {
      res.json(error);
    }
  }

  static async updateUser(req, res) {
    try {
      const id = +req.params.id;
      const { username, email} = req.body;

      let {password} = req.body

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

      res.json(result);
    } catch (error) {
      res.json(error);
    }
  }
}

module.exports = UserController;
