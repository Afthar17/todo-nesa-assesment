import express from "express";
import {
  checkAuth,
  login,
  logout,
  register,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/checkAuth", protect, checkAuth);
router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);

export default router;
