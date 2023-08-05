const products = require("../Public/products");
const Product = require("../model/productModel");

const DefaultData = async () => {
  try {
    await Product.deleteMany({});
    const storeData = await Product.insertMany(products);
  } catch (error) {
    console.log("error" + error.message);
  }
};

module.exports = DefaultData;
