const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const UserSchema = mongoose.Schema({
  username: { type: String, required: true ,index: true ,unique: true},
  password: { type: String, required: true },
  email: { type: String, required: true ,index: true ,unique: true},
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  //userprofile: { type: String, required: true },
  status: { type: Number, default:0 },
  role:{ type:Number ,default:1}
});

const validate = (UserSchema) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    address: Joi.string().required(),
    phone: Joi.string().required(),
  });
  return schema.validate(UserSchema);
};
module.exports = mongoose.model('users', UserSchema,'users',validate);