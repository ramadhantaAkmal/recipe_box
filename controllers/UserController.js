const { user } = require("../models");

class UserController {
  static async detailUser(req, res) {
    try {
      const id = +req.params.id;
      let users = user.findByPk(id);
      res.json(users);
    } catch (error) {
      res.json(error);
    }
  }

  static async updateUser(req, res) {
    try {
      const id = +req.params.id;
      const { username, email, password } = req.body;
      let result = user.update(
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
