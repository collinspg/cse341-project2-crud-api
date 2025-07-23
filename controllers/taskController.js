const Task = require('../modelTasks/');
const { taskCreateSchema, taskUpdateSchema } = require('../validation/taskValidation');

// Create task
exports.createTask = async (req, res) => {
  /*
    #swagger.tags = ['Tasks']
    #swagger.summary = 'Create a new task'
    #swagger.description = 'Creates a new task with the provided information'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Task information',
      required: true,
      schema: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            description: 'Task title',
            example: 'Complete project documentation'
          },
          description: {
            type: 'string',
            description: 'Task description',
            example: 'Write comprehensive API documentation for the project'
          },
          dueDate: {
            type: 'string',
            format: 'date-time',
            description: 'Task due date',
            example: '2025-06-01T10:00:00Z'
          },
          assignedUser: {
            type: 'string',
            description: 'ID of the assigned user',
            example: '60d5ec49fcd2b2001f8e4c23'
          },
          completed: {
            type: 'boolean',
            description: 'Task completion status',
            example: false
          }
        },
        required: ['title']
      }
    }
    #swagger.responses[201] = {
      description: 'Task created successfully',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          data: {
            type: 'object',
            properties: {
              _id: { type: 'string', example: '60d5ec49fcd2b2001f8e4c23' },
              title: { type: 'string', example: 'Complete project documentation' },
              description: { type: 'string', example: 'Write comprehensive API documentation' },
              dueDate: { type: 'string', format: 'date-time' },
              assignedUser: { type: 'string' },
              completed: { type: 'boolean', example: false },
              createdAt: { type: 'string', format: 'date-time' }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: 'Bad Request - Validation error',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          error: { type: 'string', example: 'Title is required' }
        }
      }
    }
    #swagger.responses[500] = {
      description: 'Internal Server Error',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          error: { type: 'string', example: 'Database connection failed' }
        }
      }
    }
  */
  try {
    const { error } = taskCreateSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, error: error.details[0].message });

    const task = new Task(req.body);
    await task.save();

    res.status(201).json({ success: true, data: task });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get all tasks
exports.getTasks = async (req, res) => {
  /*
    #swagger.tags = ['Tasks']
    #swagger.summary = 'Get all tasks'
    #swagger.description = 'Retrieves a list of all tasks with populated user information'
    #swagger.parameters['page'] = {
      in: 'query',
      description: 'Page number for pagination',
      type: 'integer',
      example: 1
    }
    #swagger.parameters['limit'] = {
      in: 'query',
      description: 'Number of tasks per page',
      type: 'integer',
      example: 10
    }
    #swagger.parameters['completed'] = {
      in: 'query',
      description: 'Filter by completion status',
      type: 'boolean',
      example: false
    }
    #swagger.parameters['assignedUser'] = {
      in: 'query',
      description: 'Filter by assigned user ID',
      type: 'string',
      example: '60d5ec49fcd2b2001f8e4c23'
    }
    #swagger.responses[200] = {
      description: 'Tasks retrieved successfully',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          count: { type: 'integer', example: 5 },
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                _id: { type: 'string', example: '60d5ec49fcd2b2001f8e4c23' },
                title: { type: 'string', example: 'Complete project documentation' },
                description: { type: 'string', example: 'Write comprehensive API documentation' },
                dueDate: { type: 'string', format: 'date-time' },
                assignedUser: {
                  type: 'object',
                  properties: {
                    _id: { type: 'string' },
                    firstName: { type: 'string', example: 'John' },
                    lastName: { type: 'string', example: 'Doe' },
                    email: { type: 'string', example: 'john.doe@example.com' }
                  }
                },
                completed: { type: 'boolean', example: false },
                createdAt: { type: 'string', format: 'date-time' }
              }
            }
          }
        }
      }
    }
    #swagger.responses[500] = {
      description: 'Internal Server Error',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          error: { type: 'string', example: 'Database connection failed' }
        }
      }
    }
  */
  try {
    const tasks = await Task.find().populate('assignedUser', 'firstName lastName email');
    res.json({ success: true, count: tasks.length, data: tasks });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get single task
exports.getTaskById = async (req, res) => {
  /*
    #swagger.tags = ['Tasks']
    #swagger.summary = 'Get task by ID'
    #swagger.description = 'Retrieves a specific task by its ID with populated user information'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Task ID',
      required: true,
      type: 'string',
      example: '60d5ec49fcd2b2001f8e4c23'
    }
    #swagger.responses[200] = {
      description: 'Task retrieved successfully',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          data: {
            type: 'object',
            properties: {
              _id: { type: 'string', example: '60d5ec49fcd2b2001f8e4c23' },
              title: { type: 'string', example: 'Complete project documentation' },
              description: { type: 'string', example: 'Write comprehensive API documentation' },
              dueDate: { type: 'string', format: 'date-time' },
              assignedUser: {
                type: 'object',
                properties: {
                  _id: { type: 'string' },
                  firstName: { type: 'string', example: 'John' },
                  lastName: { type: 'string', example: 'Doe' },
                  email: { type: 'string', example: 'john.doe@example.com' }
                }
              },
              completed: { type: 'boolean', example: false },
              createdAt: { type: 'string', format: 'date-time' }
            }
          }
        }
      }
    }
    #swagger.responses[404] = {
      description: 'Task not found',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          error: { type: 'string', example: 'Task not found' }
        }
      }
    }
    #swagger.responses[500] = {
      description: 'Internal Server Error',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          error: { type: 'string', example: 'Invalid ObjectId format' }
        }
      }
    }
  */
  try {
    const task = await Task.findById(req.params.id).populate('assignedUser', 'firstName lastName email');
    if (!task) return res.status(404).json({ success: false, error: 'Task not found' });
    res.json({ success: true, data: task });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  /*
    #swagger.tags = ['Tasks']
    #swagger.summary = 'Update task'
    #swagger.description = 'Updates an existing task with new information'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Task ID',
      required: true,
      type: 'string',
      example: '60d5ec49fcd2b2001f8e4c23'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated task information',
      required: true,
      schema: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            description: 'Task title',
            example: 'Updated project documentation'
          },
          description: {
            type: 'string',
            description: 'Task description',
            example: 'Updated comprehensive API documentation for the project'
          },
          dueDate: {
            type: 'string',
            format: 'date-time',
            description: 'Task due date',
            example: '2025-06-15T10:00:00Z'
          },
          assignedUser: {
            type: 'string',
            description: 'ID of the assigned user',
            example: '60d5ec49fcd2b2001f8e4c23'
          },
          completed: {
            type: 'boolean',
            description: 'Task completion status',
            example: true
          }
        }
      }
    }
    #swagger.responses[200] = {
      description: 'Task updated successfully',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          data: {
            type: 'object',
            properties: {
              _id: { type: 'string', example: '60d5ec49fcd2b2001f8e4c23' },
              title: { type: 'string', example: 'Updated project documentation' },
              description: { type: 'string', example: 'Updated comprehensive API documentation' },
              dueDate: { type: 'string', format: 'date-time' },
              assignedUser: { type: 'string' },
              completed: { type: 'boolean', example: true },
              createdAt: { type: 'string', format: 'date-time' }
            }  
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: 'Bad Request - Validation error',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          error: { type: 'string', example: 'Invalid date format' }
        }
      }
    }
    #swagger.responses[404] = {
      description: 'Task not found',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          error: { type: 'string', example: 'Task not found' }
        }
      }
    }
    #swagger.responses[500] = {
      description: 'Internal Server Error',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          error: { type: 'string', example: 'Database connection failed' }
        }
      }
    }
  */
  try {
    const { error } = taskUpdateSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, error: error.details[0].message });

    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!task) return res.status(404).json({ success: false, error: 'Task not found' });

    res.json({ success: true, data: task });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  /*
    #swagger.tags = ['Tasks']
    #swagger.summary = 'Delete task'
    #swagger.description = 'Deletes a task by its ID'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Task ID',
      required: true,
      type: 'string',
      example: '60d5ec49fcd2b2001f8e4c23'
    }
    #swagger.responses[200] = {
      description: 'Task deleted successfully',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Task deleted successfully' }
        }
      }
    }
    #swagger.responses[404] = {
      description: 'Task not found',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          error: { type: 'string', example: 'Task not found' }
        }
      }
    }
    #swagger.responses[500] = {
      description: 'Internal Server Error',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          error: { type: 'string', example: 'Database connection failed' }
        }
      }
    }
  */
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ success: false, error: 'Task not found' });

    res.json({ success: true, message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};