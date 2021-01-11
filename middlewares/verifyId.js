const { ObjectId } = require('mongodb');

const INVALIDO = 422;

// [Será validado que não é possível listar/alterar/deletar um produto que não existe]
const verifyId = async (req, res, next) => {
  const { id } = req.params;

  // macetinho do ObjectId.isValid() graças ao consagrado Lipe
  if (!ObjectId.isValid(id)) {
    return res.status(INVALIDO).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }

  next();
};

module.exports = verifyId;
