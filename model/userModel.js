const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    profilepic: {
      type: String,
      default: "https://i.dummyjson.com/data/products/1/1.jpg",
    },
    cart: {
      type: Array,
      dafault: [],
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
