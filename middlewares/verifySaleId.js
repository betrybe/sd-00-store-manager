const { ObjectId } = require('mongodb');
const { findBySaleId } = require('../models');

// [Será validado que não é possível listar/alterar/deletar uma venda que não existe]
const verifySaleId = async (req, res, next) => {
  const { id } = req.params;
  const checkIdExists = await findBySaleId(id);

  // macetinho do ObjectId.isValid() graças ao consagrado Lipe
  if (!ObjectId.isValid(id) || !checkIdExists) {
    return res.status(404).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }

  next();
};

module.exports = verifySaleId;
