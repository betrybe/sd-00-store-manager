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

// requisito 1 - crie um endpoint para o cadastro de produtos;
productsController.post('/', verifyProduct, async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await createProduct(name, quantity);

    return res.status(201).json(newProduct);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }

    return res.status(500).json({ message: 'Oops! Something went wrong.' });
  }
});

// requisito 2 - crie um endpoint para listar os produtos;
productsController.get('/', async (_req, res) => {
  try {
    const allProducts = await getAllProducts();

    return res.status(200).json({ products: allProducts });
  } catch {
    return res.status(500).json({ message: 'Oops! Something went wrong.' });
  }
});

productsController.get('/:id', verifyId, async (req, res) => {
  const { id } = req.params;

  try {
    const product = await findByProductId(id);

    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json({ message: 'Oops! Something went wrong.' });
  }
});

// requisito 3 - crie um endpoint para atualizar um produto;
productsController.put('/:id', verifyProduct, async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  try {
    const updatedProduct = await updateProductById(id, { name, quantity });

    return res.status(200).json(updatedProduct);
  } catch (err) {
    return res.status(500).json({ message: 'Oops! Something went wrong.' });
  }
});

// requisito 4 - crie um endpoint para deletar um produto
productsController.delete('/:id', verifyId, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await excludeProductById(id);

    return res.status(200).json(deletedProduct);
  } catch (err) {
    return res.status(500).json({ message: 'Oops! Something went wrong.' });
  }
});

module.exports = productsController;
