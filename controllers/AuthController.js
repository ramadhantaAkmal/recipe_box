const { user, recipe } = require("../models");
const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {
  static async register(req, res) {
    try {
      const { username, email } = req.body;

      let { password } = req.body;

      password = await bcrypt.hash(password, 10);

      // console.log(encryptedPassword);

      const users = await user.create({
        username,
        email,
        password,
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
      const { email, password } = req.body;

      if (!(email && password)) {
        res.status(400).send("All input is required");
      }

      const users = await user.findOne({ where: { email: email } });

      if (users && (await bcrypt.compare(password, users.password))) {
        console.log("password sama");
        const token = jwt.sign(
          { user_id: users.id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );

        users.refresh_token = token;

        res.status(200).json(users);
        return;
      }
      res.status(400).send("Invalid Credentials");
    } catch (error) {
      res.json(error);
    }
  }
}

module.exports = AuthController;
