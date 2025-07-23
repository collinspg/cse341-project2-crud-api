const Joi = require('joi');

const userCreateSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().optional(),
  address: Joi.string().optional(),
  role: Joi.string().valid('admin', 'user').optional()
});

const userUpdateSchema = Joi.object({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  address: Joi.string().optional(),
  role: Joi.string().valid('admin', 'user').optional()
});

module.exports = { userCreateSchema, userUpdateSchema };