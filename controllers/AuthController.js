const { user, recipe } = require("../models");
const bcrypt = require("bcryptjs/dist/bcrypt");

class AuthController {
  static async register(req, res) {
    try {
      const { username, email, password } = req.body;

      const encryptedPassword = await bcrypt.hash(password, 10);

      const users = await user.create({
        username,
        email,
        encryptedPassword,
      });

      const token = jwt.sign(
        { user_id: users.id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      users.refresh_token = token;

      res.status(201).json(users);
    } catch (error) {
      res.json(error);
    }
  }

  static async login(req, res) {
    try {
    } catch (error) {}
  }
}

module.exports = AuthController
