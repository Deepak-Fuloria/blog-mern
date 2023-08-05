const express = require("express");
const {
  register,
  login,
  logout,
  AddToCart,
  cart,
  deleteProduct,
  profile,
  profileImage,
  getUser,
} = require("../controller/userController");
const islogin = require("../middleware/auth");

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/logout", logout);
userRouter.put("/addToCart/:pid/:quant", islogin, AddToCart);
userRouter.get("/cart", islogin, cart);
userRouter.post("/profile", islogin, profile);
userRouter.get("/getUser", islogin, getUser);
userRouter.post("/profileImage", islogin, profileImage);
userRouter.get("/deleteProduct/:pid", islogin, deleteProduct);

module.exports = userRouter;
