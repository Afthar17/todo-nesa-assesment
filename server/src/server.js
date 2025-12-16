import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PORT } from "./utils/dotenv.js";
import { connectDB } from "./lib/db.js";
import AuthRoutes from "./routes/authRoutes.js";
import TodoRoutes from "./routes/todoRoutes.js";

const app = express();

connectDB();
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/auth", AuthRoutes);
app.use("/api/todos", TodoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
