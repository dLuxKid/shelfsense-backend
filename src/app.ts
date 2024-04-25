import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import hpp from "hpp";

import express from "express";
import type { Application, Request, Response } from "express";

const app: Application = express();

app.use(compression());
app.use(cookieParser());
app.use(helmet());
const limiter = rateLimit({
  max: 100,
  windowMs: 10 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(mongoSanitize());
app.use(
  cors({
    credentials: true,
  })
);
app.use(hpp());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello world");
});

export default app;
