const { findByProductName } = require('../models/index');

const verifyProduct = async (req, res, next) => {
  const { name, quantity } = req.body;

  // [Será validado que não é possível criar um produto com o nome menor que 5 caracteres]
  if (name && name.length < 5) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }

  // [Será validado que não é possível criar um produto com quantidade menor que ou igual a zero]
  if (quantity <= 0) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }

  // [Será validado que não é possível criar um produto com uma string no campo quantidade]
  if (quantity && !Number.isInteger(quantity)) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }

  // [Será validado que não é possível criar um produto com o mesmo nome de outro já existente]
  const checkExistence = await findByProductName(name);

  if (checkExistence) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }

  next();
};

module.exports = verifyProduct;
