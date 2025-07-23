const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

const isAuthenticated  = require('../validation/authenticate');

// #swagger.tags = ['Tasks']
// #swagger.description = 'Create a new task'
router.post('/', isAuthenticated, taskController.createTask);

// #swagger.tags = ['Tasks']
// #swagger.description = 'Get all tasks'
router.get('/', taskController.getTasks);

// #swagger.tags = ['Tasks']
// #swagger.description = 'Get task by ID'
router.get('/:id', taskController.getTaskById);

// #swagger.tags = ['Tasks']
// #swagger.description = 'Update task'
router.put('/:id', isAuthenticated, taskController.updateTask);

// #swagger.tags = ['Tasks']
// #swagger.description = 'Delete task'
router.delete('/:id', isAuthenticated, taskController.deleteTask);

module.exports = router;