// routes/auth-routes.js
const express = require("express");
const authRoutes = express.Router();
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");



// User model
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

// Signup route methods and functionallity
authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const address = req.body.address;
  const city = req.body.city;
  const zipCode = req.body.zipCode;
  const newsletter = req.body.newsletter;
  const provider = req.body.isProvider;
  const fee = req.body.fee;
  const description = req.body.description;
  const category = req.body.category;

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      firstName,
      lastName,
      description,
      address,
      city,
      zipCode,
      newsletter,
      isProvider: provider,
      fee,
      category
    });

    newUser.save((err) => {
      if (err) {
        res.render("auth/signup", { message: "Something went wrong" });
      } else {
        res.redirect("/login");
      }
    });
  });
});

//Provider signup roots and functionallity

authRoutes.get("/signup-provider", (req, res, next) => {
  res.render("auth/signup-provider");
});



// Login routes and functionallity
authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

authRoutes.post("/login", passport.authenticate("local", {
  successRedirect: "/customer-area",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

//Logout route
authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = authRoutes;
