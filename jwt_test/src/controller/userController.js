import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userController = {
  register: async (req, res) => {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await userModel.insert(username, hashedPassword);
      res.json(user);
    } catch (error) {
      console.log(error.message);
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await userModel.loginUser(username, password);
      console.log(user);
      const passwordMatch = await bcrypt.compare(
        password,
        user.rows[0].password
      );
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
      const accessToken = jwt.sign(
        { userId: user.rows[0].id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "15m",
        }
      );

      const refreshToken = jwt.sign(
        { userId: user.rows[0].id },
        process.env.REFRESH_TOKEN_SECRET
      );

      await userModel.insertRefreshToken(refreshToken);

      res.json({ accessToken, refreshToken });
    } catch (error) {
      console.log(error.message);
    }
  },

  refreshTokenHandling: async (req, res) => {
    try {
      const refreshToken = req.body.refreshToken;

      const result = await userModel.selectRefreshToken(refreshToken);

      if (result.rows.length === 0) {
        return res.status(403).json({ error: "Invalid refresh token" });
      }

      // If valid, generate a new access token
      const accessToken = jwt.sign(
        { userId: result.rows[0].id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "15m",
        }
      );

      res.json({ accessToken });
    } catch (error) {
      console.log(error.message);
    }
  },
};

export default userController;
