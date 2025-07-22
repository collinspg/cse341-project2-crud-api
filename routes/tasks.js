const express = require('express');
const router = express.Router();
const taskController = require('../controllers/tasks');
const { taskCreateSchema, taskUpdateSchema } = require('../validation/taskValidation');
const isAuthenticated = require('../validation/authenticate');

// CREATE task
router.post('/', isAuthenticated, async (req, res, next) => {
  try {
    const { error } = taskCreateSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const task = await taskController.createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
});

// READ all tasks
router.get('/', taskController.getAllTasks);

// READ single task
router.get('/:id', taskController.getTaskById);

// UPDATE task
router.put('/:id', isAuthenticated, async (req, res, next) => {
  try {
    const { error } = taskUpdateSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const task = await taskController.updateTask(req.params.id, req.body);
    res.json(task);
  } catch (err) {
    next(err);
  }
});

// DELETE task
router.delete('/:id', isAuthenticated, taskController.deleteTask);

module.exports = router;
