import express, { urlencoded } from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import rouse from "./routes/route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: true }))
app.use(fileUpload());
app.use(express.static("public"));
app.use(rouse);

app.listen(5000, () => console.log("Server Up and running..."));
