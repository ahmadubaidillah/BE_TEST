import express from "express";
import userController from "../controller/userController.js";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/refresh-token", userController.refreshTokenHandling);

export default router;
