import jwt from "jsonwebtoken";
import { JWT_SECRET, NODE_ENV } from "./dotenv.js";

export const genToken = (id, res) => {
  const token = jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};
