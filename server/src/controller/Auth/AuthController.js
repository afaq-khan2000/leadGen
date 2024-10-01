const path = require("path");
const moment = require("moment");
const DB = require("../../dbConfig/mdbConnection");
const { hashPassword, comparePassword } = require("../../Helper/hashPasswordHelper");
const { generateToken } = require("../../Helper/jwtHelper");

const AuthController = {
  async signup(req, res) {
    let t;
    try {
      t = await DB.sequelize.transaction();
      const {
        username,
        email,
        password,
        first_name,
        last_name,
        dealership_name,
      } = req.body;

      const userExist = await DB.UserModel.findOne({
        where: { email },
      });

      if (userExist) {
        return res.errorResponse(true, "User already exist");
      }

      let hashedPassword = await hashPassword(password);

      const user = await DB.UserModel.create(
        {
          username,
          email,
          password_hash: hashedPassword,
          first_name,
          last_name,
          dealership_name,
        },
        { transaction: t }
      );

      await t.commit();
      return res.successResponse(true, { user }, "User created successfully");
    } catch (error) {
      await t.rollback();
      console.log("signup: ", error);
      return res.errorResponse(true, error.message);
    }
  },

  // login
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await DB.UserModel.findOne({
        where: { email },
      });

      if (!user) {
        return res.errorResponse(true, "User not found");
      }

      const validPass = await comparePassword(password, user.password_hash);
      if (!validPass) {
        return res.errorResponse(true, "Invalid password");
      }

      let token = generateToken({
        user_id: user.user_id,
        email: user.email,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        dealership_name: user.dealership_name,
        created_at: moment().format(),
      });

      return res.successResponse(
        true,
        { token, user },
        "User logged in successfully"
      );
    } catch (error) {
      console.log("login: ", error);
      return res.errorResponse(true, error.message);
    }
  },
};

module.exports = AuthController;
