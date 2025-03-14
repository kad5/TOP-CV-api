require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const express = require("express");
const router = require("./src/router");
const { passport } = require("./src/passport-config");

const app = express();
app.use(passport.initialize());

app.use(helmet()); //securtiy dependency
app.use((req, res, next) => {
  res.set({
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    Pragma: "no-cache",
    Expires: "0",
    "Surrogate-Control": "no-store",
  });
  next();
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.DEV_ORIGIN, process.env.PROD_ORIGIN],
    credentials: true,
  })
);

app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
