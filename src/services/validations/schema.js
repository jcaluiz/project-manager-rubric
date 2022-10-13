// const Joi = require('joi');

// const addNameProductSchema = Joi.object({
//   name: Joi.string().min(5),
// });

const validateNameSchema = (name) => {
  if (name === '' || name === undefined) {
    return { message: '"name" is required', status: 400 };
  }
  if (name.length < 5) {
    return { message: '"name" length must be at least 5 characters long', status: 422 };
  }
  return null;
};

module.exports = {
  // addNameProductSchema,
  validateNameSchema,
};
