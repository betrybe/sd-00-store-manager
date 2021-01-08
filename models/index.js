const getCollection = require('./connection');

const {
  createProduct,
  findByProductName,
  findByProductId,
  getAllProducts,
  updateProductById,
  excludeProductById,
} = require('./productsModel');

const {
  createSales,
  findBySaleId,
  getAllSales,
  updateSaleById,
  excludeSaleById,
} = require('./salesModel');

module.exports = {
  getCollection,
  createProduct,
  findByProductName,
  findByProductId,
  getAllProducts,
  updateProductById,
  excludeProductById,
  createSales,
  findBySaleId,
  getAllSales,
  updateSaleById,
  excludeSaleById,
};
