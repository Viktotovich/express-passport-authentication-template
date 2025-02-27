const indexRouter = require("express").Router();
const {
  getIndex,
  getLogIn,
  postLogIn,
  getRegister,
  postRegister,
  getLogInFail,
  getLogInSuccess,
  getLogout,
  getProtectedRoute,
} = require("../controllers/indexController");

indexRouter.get("/", getIndex);
indexRouter.get("/login", getLogIn);
indexRouter.post("/login", postLogIn);
indexRouter.get("/register", getRegister);
indexRouter.post("/register", postRegister);
indexRouter.get("/login-failure", getLogInFail);
indexRouter.get("/login-success", getLogInSuccess);
indexRouter.get("/protected-route", getProtectedRoute);
indexRouter.get("/logout", getLogout);

module.exports = indexRouter;
