const bcrypt = require("bcryptjs");
const User = require("../model/userdata.js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Token = require("../model/token.js");

dotenv.config(); // Load environment variables from .env file

// Signup user function
exports.signupUser = async (request, response) => {
  try {
    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    const user = {
      username: request.body.username,
      name: request.body.name,
      password: hashedPassword,
    };
    const newUser = new User(user);
    await newUser.save();
    return response.status(200).json({ msg: "Signup successful" });
  } catch (error) {
    return response
      .status(500)
      .json({ msg: "Error while signing up the user" });
  }
};

// Login user function
exports.loginUser = async (request, response) => {
  let user = await User.findOne({ username: request.body.username });
  if (!user) {
    return response.status(400).json({ msg: "Username does not match" });
  }
  try {
    let match = await bcrypt.compare(request.body.password, user.password);
    if (match) {
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFRESH_SECRET_KEY
      );

      const newToken = new Token({ token: refreshToken });
      await newToken.save();
      return response.status(200).json({
        accessToken,
        refreshToken,
        name: user.name,
        username: user.username,
      });
    } else {
      return response.status(400).json({ msg: "Password does not match" });
    }
  } catch (error) {
    return response
      .status(500)
      .json({ msg: "Error while logging in the user" });
  }
};
