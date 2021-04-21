"use strict";

module.exports = function(_) {
    return {
        SetRouting: function(router) {
            router.get("/", this.indexPage);
            router.get("/signup", this.signUpPage);
        },
        indexPage: function(req, res) {
            return res.render("index")
        },
        signUpPage: function(req, res) {
            return res.render("auth/signup");
        }
    }
}