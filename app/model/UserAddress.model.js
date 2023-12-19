const mongoose = require('mongoose');

const UserAddressSchema = mongoose.Schema({
  street: { type: String, required: true },
  userId: { type: String, required: true },
  zip_code :{type:String, require:true},
  city  :{type:String, require:true},
  state :{type:String, require:true},
  country :{type:String, require:true},
  type   :{type:String, require:true , index:true}  //options would be 'billing', 'shipping'
});

module.exports = mongoose.model('user_address', UserAddressSchema);