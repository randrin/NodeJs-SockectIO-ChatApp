"use strict";

module.exports = function (_, passport) {
  return {
    SetRouting: function (router) {
      router.get("/", this.indexPage);
      router.get("/home", this.homePage);
      router.get("/signup", this.getSignUp);
      router.post("/register", this.postSignUp);
    },
    indexPage: function (req, res) {
      return res.render("index");
    },

    getSignUp: function (req, res) {
      return res.render("auth/signup");
    },
    postSignUp: passport.authenticate("local.signup", {
      successRedirect: "/home",
      failureRedirect: "/signup",
      failureFlash: true,
    }),
    homePage: function (req, res) {
      return res.render("chat/home");
    },
  };
};
