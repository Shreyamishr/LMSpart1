import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import authRouter from "./route/authRoute.js";
import userRouter from "./route/userRoute.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());

// CORS CONFIG → FRONTEND MUST MATCH
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// CONNECT DATABASE
connectDb();

// ROUTES
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// TEST ROUTE
app.get("/", (req, res) => {
    res.send("Hello from Server");
});

// START SERVER
app.listen(port, () => {
    console.log(`Server Started on PORT ${port}`);
});
