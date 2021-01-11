const { findByProductName } = require('../models/index');

const INVALIDO = 422;
const MIN_QTD = 0;
const MIN_NAME_SIZE = 5;
const error = (message) => ({
  code: 'invalid_data',
  message,
});

const verifyProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  if (name && name.length < MIN_NAME_SIZE)
    return res.status(INVALIDO).json({
      err: error('"name" length must be at least 5 characters long'),
    });
  if (quantity <= MIN_QTD)
    return res.status(INVALIDO).json({
      err: error('"quantity" must be larger than or equal to 1'),
    });
  if (quantity && !Number.isInteger(quantity)) {
    return res.status(INVALIDO).json({ err: error('"quantity" must be a number') });
  }
  const checkExistence = await findByProductName(name);
  if (checkExistence)
    return res.status(INVALIDO).json({ err: error('Product already exists') });
  next();
};

module.exports = verifyProduct;
