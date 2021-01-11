const express = require('express');
const { verifySale, verifySaleId, verifyDeletedId } = require('../middlewares/index');
const {
  createSales,
  findBySaleId,
  getAllSales,
  updateSaleById,
  excludeSaleById,
} = require('../models/index');

const salesController = express.Router();

const STATUS = {
  SUCESSO: 200,
  CADASTRADO: 201,
  INVALIDO: 422,
  ERROR: 500,
  NOT_FOUND: 404,
};

const ERR_MESSAGE = 'Oops! Something went wrong.';

// requisito 5 - crie um endpoint para o cadastro de vendas;
salesController.post('/', verifySale, async (req, res) => {
  const itemsSold = req.body;

  try {
    const newSales = await createSales(itemsSold);

    return res.status(STATUS.SUCESSO).json(newSales);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(STATUS.INVALIDO)
        .json({ err: { code: err.code, message: err.message } });
    }

    return res.status(STATUS.ERROR).json({ message: ERR_MESSAGE });
  }
});

// requisito 6 - crie um endpoint para listar as vendas;
salesController.get('/', async (_req, res) => {
  try {
    const allSales = await getAllSales();

    return res.status(STATUS.SUCESSO).json({ sales: allSales });
  } catch {
    return res.status(STATUS.ERROR).json({ message: ERR_MESSAGE });
  }
});

salesController.get('/:id', verifySaleId, async (req, res) => {
  const { id } = req.params;

  try {
    const sale = await findBySaleId(id);

    return res.status(STATUS.SUCESSO).json(sale);
  } catch (err) {
    return res.status(STATUS.ERROR).json({ message: ERR_MESSAGE });
  }
});

// requisito 7 - crie um endpoint para atualizar uma venda;
salesController.put('/:id', verifySale, async (req, res) => {
  const { id } = req.params;
  const itemsUpdated = { itensSold: req.body };

  try {
    const updatedSale = await updateSaleById(id, itemsUpdated);
    console.log(updatedSale, 'updated');
    return res.status(STATUS.SUCESSO).json(updatedSale);
  } catch (err) {
    return res.status(STATUS.ERROR).json({ message: ERR_MESSAGE });
  }
});

// requisito 8 - crie um endpoint para deletar uma venda
salesController.delete('/:id', verifyDeletedId, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSale = await excludeSaleById(id);

    res.status(STATUS.SUCESSO).json(deletedSale);
  } catch (err) {
    return res.status(STATUS.NOT_FOUND)
      .json({ err: { code: err.code, message: err.message } });
  }

  return res.status(STATUS.ERROR).json({ message: ERR_MESSAGE });
});

module.exports = salesController;
