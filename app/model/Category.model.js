const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});
const validate = (CategorySchema) => {
  const Schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(CategorySchema);
}
module.exports = mongoose.model('categories', CategorySchema , 'categories' ,validate);