
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  isProvider: { type: Boolean, default: false },
  availability: Date,
  address: String,
  city: String,
  zipCode: String,
  location: { lat: Number, long: Number },
  newsletter: { type: Boolean, default: false },
  isProvider: { type: Boolean, default: false },
  fee: { type: Number, default: null },
  description: String,
  category: { type: String, default: null },
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
