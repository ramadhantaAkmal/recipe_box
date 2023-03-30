const { user } = require("../models");
const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken");
const Op = require("Sequelize").Op;

class AuthController {
  static showLoginPage(req, res) {
    res.render("auth/login/index.ejs");
  }

  static showRegisterPage(req, res) {
    res.render("auth/register/index.ejs");
  }

  static async register(req, res) {
    try {
      const { username, email } = req.body;
      const userExist = await user.findOne({
        where: {
          [Op.or]: [{ email: email }, { username: username }],
        },
      });

      if (userExist) {
        return res.json({
          message: "Email or Username have been used",
        });
      }

      let { password } = req.body;

      password = await bcrypt.hash(password, 10);

      const users = await user.create({
        username,
        email,
        password,
      });

      // const token = jwt.sign(
      //   { user_id: users.id, email },
      //   process.env.TOKEN_KEY,
      //   {
      //     expiresIn: "2h",
      //   }
      // );

      // res.status(201).json({
      //   message: "Success register",
      // });
      res.redirect("/login");
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
        // console.log("password sama");
        const token = jwt.sign(
          { user_id: users.id, username: users.username },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        
        // res.status(200).json({
        //   message: "Success login",
        //   token: token,
        // });
        res.cookie("authorization", `Bearer ${token}`);
        res.redirect("/home");

        return;
      }
      res.status(400).json({ message: "Invalid Credentials" });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }

  static logout(req, res) {
    res.clearCookie("authorization");
    // redirect to login
    return res.redirect("/");
  }
}

module.exports = AuthController;
