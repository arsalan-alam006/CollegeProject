import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import departmentRouter from "./routes/department.js"; // ✅ ADD
import connectToDatabase from "./db/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

connectToDatabase();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/departments", departmentRouter); // ✅ ADD THIS

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
