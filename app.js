const express = require("express");
require("dotenv").config();
const path = require("node:path");
const pgPool = require("./db/pool");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
require("./config/passport");

const crypto = require("crypto");
const app = express();

//Routes
const indexRouter = require("./routes/index");

const assetsPath = path.join(__dirname, "public");

app.use(express.json());
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    store: new pgSession({
      pool: pgPool,
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, //one day
    },
  })
);

app.use("/", indexRouter);

app.listen(3000);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Houston, we've got a problem: " + err);
});
