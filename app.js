const express = require("express");
const pgPool = require("./db/pool");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);

const crypto = require("crypto");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
require("dotenv").config();

const app = express();

app.use(express.urlencoded({ extended: true }));

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
