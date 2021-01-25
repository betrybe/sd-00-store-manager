const { ObjectId } = require('mongodb');
const { findByProductId } = require('../models');

const INVALIDO = 422;
const NOT_FOUND = 404;
const MIN_QTD = 0;

const error = (message) => ({
  code: 'invalid_data',
  message,
});

const verifySale = async (req, res, next) => {
  req.body.forEach(async (item) => {
    if (item.quantity <= MIN_QTD ||
      !Number.isInteger(item.quantity) ||
      !ObjectId.isValid(item.productId)) {
      return res.status(INVALIDO).json({
        err: error('Wrong product ID or invalid quantity'),
      });
    }
    const product = await findByProductId(item.productId);
    const newQuantity = product.quantity - item.quantity;
    if (newQuantity < MIN_QTD) {
      return res.status(NOT_FOUND).json({
        err: error('Such amount is not permitted to sell'),
      });
    }
  });

  next();
};

module.exports = verifySale;
