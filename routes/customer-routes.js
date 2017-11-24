const express = require("express");
const customerRoutes = express.Router();
const ensureLogin = require("connect-ensure-login");
const Order = require("../models/Order");
const User = require("../models/User");

// Private routes
customerRoutes.get("/customer-area", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("customer-area", { user: req.user });
});

// User profile & user profile update
customerRoutes.get("/profile", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("profile", { user: req.user });
});

customerRoutes.post('/profile', (req, res, next) => {

  const userID = req.user;

  const username = req.body.username;
  const password = req.user.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const description = req.body.description;
  const address = req.body.address;
  const city = req.body.city;
  const zipCode = req.body.zipCode;
  const newsletter = req.body.newsletter;

  const updates = {
    username,
    password,
    firstName,
    lastName,
    description,
    address,
    city,
    zipCode,
    newsletter
  };

  User.findByIdAndUpdate(userID, updates, (err, user) => {
    if (err){ return next(err); }
    return res.redirect('/customer-area');
  });
});

customerRoutes.post("/customer-area", (req, res, next) => {
  const category = req.body.category;
  const date = req.body.date;
  const userOwner = req.user._id;

  if (category === "" || date === "") {
    res.render("/customer-area", { message: "Indica categoría y fecha" });
    return;
  }

    const newOrder = new Order({
      user: userOwner,
      category,
      date
    });

    console.log(newOrder);

    newOrder.save((err) => {
      console.log(err);
      if (err) {
        res.render("customer-area", { message: "Ops! Algo ha salido mal." });
      } else {
        res.redirect("/customer-area"), { message: "Reserva completada!" };
      }
    });
  });

// Oredrs history
customerRoutes.get("/customer-hist", (req, res, next) => {
  let query;

  Order
    .find(query)
    .populate('user', 'firstName')
    .sort('date')
    .exec((err, orderDocs) => {
      if (err) {
        next(err);
        return;
      }

      res.render('customer-hist', {
        orders: orderDocs,
        user: req.user
      });
    });
});


module.exports = customerRoutes;
