const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  productname: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  stockquantity: { type: String, required: true },
  address: { type: String, required: true },
  categoryId: { type: Number, required: true },
  image: { type: Number, required: true },
});

module.exports = mongoose.model('products', ProductSchema);