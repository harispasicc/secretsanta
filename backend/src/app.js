import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import template from "./template";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import childRoutes from "./routes/child.routes";
import giftRoutes from "./routes/gift.routes";
import personRoutes from "./routes/person.routes";
import personGiftRoutes from "./routes/personGift.routes";
import { updateCookie } from "./controllers/auth.controller";
import "./controllers/passport";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(compress());
app.use(helmet());
app.use(cors());
app.use((req, res, next) => {
  if (!!req.cookies["jwt"]) {
    if (
      !(
        req.url === "/api/users/login" ||
        req.url === "/api/users/logout" ||
        req.url === "/api/users/register"
      )
    ) {
      updateCookie(req, res);
    }
  }
  next();
});
app.use(passport.initialize());
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", childRoutes);
app.use("/", giftRoutes);
app.use("/", personRoutes);
app.use("/", personGiftRoutes);
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: `${err.name}: ${err.message}` });
  }
});

app.get("/", (req, res) => {
  res.status(200).send(template());
});

export default app;
