const Product = require("../model/productModel");

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

const getSingleProduct = async (req, res) => {
  const id = req.params.id;
  const singleProduct = await Product.findOne({ _id: id });
  res.status(200).json(singleProduct);
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  // test,
};
