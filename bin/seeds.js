require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const User = require('../models/User');
const Order = require('../models/Order');
const Service = require('../models/Service');


mongoose.connect(process.env.MONGODB_URL, {useMongoClient: true}).then( () =>{
  console.log("CONNECTED TO " + process.env.MONGODB_URL);
});

var salt = bcrypt.genSaltSync(bcryptSalt);
const password = "Secret Password";
var encryptedPass = bcrypt.hashSync(password, salt);

const users = [
  {
    firstName: 'Pepe',
    lastName: 'Candelas',
    password: encryptedPass,
    isProvider: true,
    descripton: "Dog lover, style nerd.",
    availability: "",
    location: "",
    facebookID: "",
  },
  {
    firstName: 'María',
    lastName: 'Echevarría',
    password: encryptedPass,
    isProvider: false,
    descripton: "",
    availability: "",
    location: "",
    facebookID: "",
  },
  {
    firstName: 'Piluca',
    lastName: 'Merengues',
    password: encryptedPass,
    isProvider: false,
    descripton: "",
    availability: "",
    location: "",
    facebookID: "",
  },
  {
    firstName: 'Borja',
    lastName: 'Torreznos',
    password: encryptedPass,
    isProvider: false,
    descripton: "",
    availability: "",
    location: "",
    facebookID: "",
  },
];

// const orders = [
//   {
//     orderDate: "",
//     user: "",
//     provider: ""
//   },
//   {
//     orderDate: "",
//     user: "",
//     provider: ""
//   },
// ];

const services = [{
  title: 'Hair style session',
  description: 'Dog love hair style session',
  category: 'style',
  photo: 'http://www.galachoveterinarios.com/wp-content/uploads/2016/03/Peluqueria-canina-felina-1903x1050.jpg'
}, ];

User.create(users, (err, docs) => {
  if (err) {
    throw err;
  }
  docs.forEach((user) => {
    console.log(user.firstName);
  });
});

Service.create(services, (err, docs) => {
  if (err) {
    throw err;
  }
  services.forEach((service) => {
    console.log(service.title);
  });
  mongoose.connection.close();
});

// Order.create(orders, (err, docs) => {
//   if (err) {
//     throw err;
//   }
//   docs.forEach((order) => {
//     console.log(order.date)
//   });
  // mongoose.connection.close();
// });
