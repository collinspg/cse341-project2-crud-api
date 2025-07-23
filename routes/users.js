const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const isAuthenticated = require('../validation/authenticate');

// #swagger.tags = ['Users']
// #swagger.description = 'Create a new user'
router.post('/', isAuthenticated, userController.createUser);

// #swagger.tags = ['Users']
// #swagger.description = 'Get all users'
router.get('/', userController.getUsers);

// #swagger.tags = ['Users']
// #swagger.description = 'Get user by ID'
router.get('/:id', userController.getUserById);

// #swagger.tags = ['Users']
// #swagger.description = 'Update user'
router.put('/:id', isAuthenticated, userController.updateUser);

// #swagger.tags = ['Users']
// #swagger.description = 'Delete user'
router.delete('/:id', isAuthenticated, userController.deleteUser);

module.exports = router;