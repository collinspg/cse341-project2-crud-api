const Joi = require('joi');

const taskCreateSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  dueDate: Joi.date().optional(),
  assignedUser: Joi.string().hex().length(24).optional(), // MongoDB ObjectId validation
  completed: Joi.boolean().optional()
});

const taskUpdateSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  dueDate: Joi.date().optional(),
  assignedUser: Joi.string().hex().length(24).optional(),
  completed: Joi.boolean().optional()
});

module.exports = { taskCreateSchema, taskUpdateSchema };