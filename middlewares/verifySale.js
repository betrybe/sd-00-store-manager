const { ObjectId } = require('mongodb');
const { findByProductId } = require('../models');

const verifySale = async (req, res, next) => {
  req.body.forEach(async (item) => {
    // [Será validado que não é possível cadastrar vendas com quantidade menor que/igual a zero]
    if (item.quantity <= 0) {
      return res.status(422).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      });
    }
    // [Será validado que não é possível cadastrar vendas com uma string no campo quantidade]
    if (!Number.isInteger(item.quantity)) {
      return res.status(422).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      });
    }
    // [Será validado que não é possível listar/alterar/deletar uma venda que não existe]
    if (!ObjectId.isValid(item.productId)) {
      return res.status(422).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      });
    }
    // requisito 10 - bônus
    const product = await findByProductId(item.productId);
    const newQuantity = product.quantity - item.quantity;
    if (newQuantity < 0) {
      return res.status(404).json({
        err: {
          code: 'stock_problem',
          message: 'Such amount is not permitted to sell',
        },
      });
    }
  });

  next();
};

module.exports = verifySale;
