import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// Routes import...
import { userRouter } from "./routes/user.routes.js";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../../Client/dist")));

// Routes declaration...
app.use("/api/v1/users", userRouter);

export default app;
