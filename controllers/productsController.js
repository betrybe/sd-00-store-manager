const express = require('express');

const { verifyProduct, verifyId } = require('../middlewares/index');
const {
  createProduct,
  getAllProducts,
  findByProductId,
  updateProductById,
  excludeProductById,
} = require('../models/index');

const productsController = express.Router();

const STATUS = {
  SUCESSO: 200,
  CADASTRADO: 201,
  INVALIDO: 422,
  ERROR: 500,
};

const ERR_MESSAGE = 'Oops! Something went wrong.';

// requisito 1 - crie um endpoint para o cadastro de produtos;
productsController.post('/', verifyProduct, async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await createProduct(name, quantity);

    return res.status(STATUS.CADASTRADO).json(newProduct);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res
        .status(STATUS.INVALIDO).json({ err: { code: err.code, message: err.message } });
    }

    return res.status(STATUS.ERROR).json({ message: ERR_MESSAGE });
  }
});

// requisito 2 - crie um endpoint para listar os produtos;
productsController.get('/', async (_req, res) => {
  try {
    const allProducts = await getAllProducts();

    return res.status(STATUS.SUCESSO).json({ products: allProducts });
  } catch {
    return res.status(STATUS.ERROR).json({ message: ERR_MESSAGE });
  }
});

productsController.get('/:id', verifyId, async (req, res) => {
  const { id } = req.params;

  try {
    const product = await findByProductId(id);

    return res.status(STATUS.SUCESSO).json(product);
  } catch (err) {
    return res.status(STATUS.ERROR).json({ message: ERR_MESSAGE });
  }
});

// requisito 3 - crie um endpoint para atualizar um produto;
productsController.put('/:id', verifyProduct, async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  try {
    const updatedProduct = await updateProductById(id, { name, quantity });

    return res.status(STATUS.SUCESSO).json(updatedProduct);
  } catch (err) {
    return res.status(STATUS.ERROR).json({ message: ERR_MESSAGE });
  }
});

// requisito 4 - crie um endpoint para deletar um produto
productsController.delete('/:id', verifyId, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await excludeProductById(id);

    return res.status(STATUS.SUCESSO).json(deletedProduct);
  } catch (err) {
    return res.status(STATUS.ERROR).json({ message: ERR_MESSAGE });
  }
});

module.exports = productsController;
