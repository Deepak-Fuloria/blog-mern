const express = require("express");

const {
  getAllProducts,
  getSingleProduct,
  // test,
} = require("../controller/productController");

const productsRouter = express.Router();

productsRouter.get("/fetchAllproducts", getAllProducts);
productsRouter.get("/singleProduct/:id", getSingleProduct);
// productsRouter.get("/test", test);

module.exports = productsRouter;
