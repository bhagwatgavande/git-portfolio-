const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
  productId: { type: Number, required: true },
  userId: { type: String, required: true },
  subtotal :{type:String, require:true},
  total  :{type:String, require:true},
  billing_address_id :{type:Number, require:true},
  shipping_address_id :{type:Number, require:true},
  status  :{type:String, require:true},
  payment_type :{type:Number, require:true}
});

module.exports = mongoose.model('orders', OrderSchema);