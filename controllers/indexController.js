const passport = require("passport");
const passwordUtils = require("../lib/passwordUtils");
const db = require("../db/queries");
const links = require("../links");

module.exports.getIndex = (req, res) => {
  const title = "Welcome to the index page";
  res.render("pages/index", { title, links });
};
