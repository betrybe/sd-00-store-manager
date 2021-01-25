const { ObjectId } = require('mongodb');

const INVALIDO = 422;
const EXPECTED_LENGTH = 24;

// [Será validado que não é possível listar/alterar/deletar uma venda que não existe]
const verifyDeletedId = async (req, res, next) => {
  const { id } = req.params;

  // macetinho do ObjectId.isValid() graças ao consagrado Lipe
  if (!ObjectId.isValid(id) || id.length !== EXPECTED_LENGTH) {
    return res.status(INVALIDO).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    });
  }

  next();
};

module.exports = verifyDeletedId;
