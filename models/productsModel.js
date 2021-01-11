const { ObjectId } = require('mongodb');
const getCollection = require('./connection');

const createProduct = async (name, quantity) => {
  const newProduct = await getCollection('products').then((products) =>
    products.insertOne({ name, quantity }));

  return { _id: newProduct.insertedId, name, quantity };
};

const excludeProductById = async (id) => {
  const deletedProduct = await getCollection('products')
    .then((products) => products.deleteOne({ _id: ObjectId(id) }));

  return deletedProduct;
};

const findByProductName = async (name) => {
  const product = await getCollection('products')
    .then((products) => products.findOne({ name }));

  return product;
};

const findByProductId = async (id) => {
  const product = await getCollection('products').then((products) =>
    products.findOne(ObjectId(id)));

  return product;
};

const getAllProducts = async () => {
  const allProducts = await getCollection('products').then((products) =>
    products.find({}).toArray());

  return allProducts;
};

const updateProductById = async (id, objeto) => {
  const { name, quantity } = objeto;
  const allProducts = await getCollection('products');

  await allProducts.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });

  return { _id: ObjectId(id), name, quantity };
};

module.exports = {
  createProduct,
  findByProductName,
  findByProductId,
  getAllProducts,
  updateProductById,
  excludeProductById,
};
