const User = require("../model/userModel");
const Product = require("../model/productModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var mongoose = require("mongoose");
const formidable = require("formidable");
var path = require("path");
var fs = require("fs");
require("dotenv").config();

// -------------------------------------------------register
const register = async (req, res) => {
  const checkUser = await User.findOne({ email: req.body.email });
  if (checkUser) {
    res.status(404).json({ type: "failed", message: "email already exists" });
  } else {
    if (req.body.password !== req.body.confirmPassword) {
      res.status(404).json({
        type: "failed",
        message: "password and confirm password are not same",
      });
    } else {
      const password = bcrypt.hashSync(req.body.password, 10);
      const confirmPassword = bcrypt.hashSync(req.body.confirmPassword, 10);
      const finalUser = { ...req.body, password, confirmPassword };

      const user = await User.create(finalUser);
      if (user) {
        const SECRET_KEY = process.env.SECRET_KEY;
        const token = jwt.sign(
          { email: req.body.email, id: user._id },
          SECRET_KEY,
          {
            expiresIn: "365d",
          }
        );

        res
          .status(200)
          .cookie(
            "jwt",
            token,
            { maxAge: 900000000, httpOnly: false },
            { path: "/" }
          )
          .json({ type: "success", message: "registration successfuly done" });
      }
    }
  }
};

// -------------------------------------------------login

const login = async (req, res) => {
  const checkUser = await User.findOne({ email: req.body.email });
  if (!checkUser) {
    res
      .status(400)
      .json({ type: "failed", message: "email or password is wrong" });
  } else {
    const { password } = req.body;
    const checkPassword = await bcrypt.compare(password, checkUser.password);

    if (checkPassword) {
      const SECRET_KEY = process.env.SECRET_KEY;
      const token = jwt.sign(
        { id: checkUser._id, email: req.body.email },
        SECRET_KEY,
        {
          expiresIn: "365d",
        }
      );
      res
        .status(200)
        .cookie("jwt", token, {
          expires: new Date(Date.now() + 999999999999),
          httpOnly: false,
        })
        .json({ type: "success", message: "login successfull", token: token });
    } else {
      res
        .status(400)
        .json({ type: "failed", message: "email or password is wrong" });
    }
  }
};

// -------------------------------------------------logout

const logout = (req, res) => {
  const response = res.clearCookie("jwt", { path: "/" });
  res.json({ type: "success", message: "logout successfull" });
};

// -------------------------------------------------AddTocart

const AddToCart = async (req, res) => {
  const { pid, quant } = req.params;
  const userData = req.userData;
  const product = await Product.findById(pid);
  const user = await User.findOne({
    $or: [{ _id: userData.id }, { email: userData.email }],
  });
  const cartData = user.cart;

  const resp = cartData.find((element) => {
    return element.product._id.toString() === pid;
  });

  if (resp && resp.quant == quant) {
    res.status(200).json(user.cart);
  } else {
    const cartData = user.cart;
    const newCartData = cartData.filter((element) => {
      return element.product._id.toString() !== pid;
    });
    const upadatedData = await User.findByIdAndUpdate(user._id, {
      $set: { cart: [...newCartData, { product, quant: quant }] },
    });
    res.status(200).json(upadatedData);
  }
};

// -------------------------------------------------send Cart DATA

const cart = async (req, res) => {
  const userData = req.userData;
  const user = await User.findOne({
    $or: [{ _id: userData.id }, { email: userData.email }],
  });
  res.status(200).json(user.cart);
};

// -------------------------------------------------send Cart DATA

const deleteProduct = async (req, res) => {
  const { pid } = req.params;
  const userData = req.userData;
  const user = await User.findOne({
    $or: [{ _id: userData.id }, { email: userData.email }],
  });

  const cartData = user.cart;
  const newCartData = cartData.filter((element) => {
    return element.product._id.toString() !== pid;
  });
  const upadatedData = await User.findByIdAndUpdate(user._id, {
    $set: { cart: [...newCartData] },
  });

  res.status(200).json(upadatedData);
};

// -------------------------------------------------update profile

const profile = async (req, res, profilepic = "") => {
  const userData = req.userData;

  const user = await User.findOne({
    $or: [{ _id: userData.id }, { email: userData.email }],
  });
  let { username, email, phone, password, confirmPassword } = user;
  if (req.body.password && req.body.confirmPassword) {
    password = bcrypt.hashSync(req.body.password, 10);
    confirmPassword = bcrypt.hashSync(req.body.confirmPassword, 10);
  }
  if (req.body.username !== "") {
    username = req.body.username;
  }

  if (req.body.phone !== "") {
    phone = req.body.phone;
  }
  if (req.body.email !== "") {
    email = req.body.email;
  }
  if (profilepic !== "") {
    profilepic = profilepic;
  }
  newData = { username, email, phone, password, confirmPassword, profilepic };

  const upadatedData = await User.findByIdAndUpdate(
    user._id,
    {
      $set: { ...newData, cart: user.cart },
    },
    { new: true }
  );
  // console.log("reached here", upadatedData);
  res.status(200).send({
    type: "success",
    message: "profile:updated",
    upadatedData: upadatedData,
  });
};

const profileImage = async (req, res, next) => {
  //  const form = formidable({ multiples: true });
  var form = new formidable.IncomingForm();
  let filesname = "";
  form.parse(req, async (err, fields, files) => {
    var oldpath = files.myfile.filepath;
    const newPath =
      path.join(__dirname, "../client/build/") +
      files.myfile.newFilename +
      files.myfile.originalFilename;
    fs.rename(oldpath, newPath, function (err) {
      if (err) throw err;
      filesname = files.myfile.newFilename + files.myfile.originalFilename;
      profile(req, res, filesname);
    });
  });
};

const getUser = async (req, res) => {
  const userData = req.userData;

  const user = await User.findOne({
    $or: [{ _id: userData.id }, { email: userData.email }],
  });
  res.status(200).json(user);
};
module.exports = {

  register,
  login,
  logout,
  AddToCart,
  cart,
  deleteProduct,
  profile,
  profileImage,
  getUser,
};
