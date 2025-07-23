const User = require('../models/User');
const { userCreateSchema, userUpdateSchema } = require('../validation/userValidation');

// Create user
exports.createUser = async (req, res) => {
  /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Create a new user'
    #swagger.description = 'Creates a new user with the provided information'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'User information',
      required: true,
      schema: {
        type: 'object',
        properties: {
          firstName: {
            type: 'string',
            description: 'User first name',
            example: 'John'
          },
          lastName: {
            type: 'string',
            description: 'User last name',
            example: 'Doe'
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'User email address',
            example: 'john.doe@example.com'
          },
          phone: {
            type: 'string',
            description: 'User phone number',
            example: '+1234567890'
          },
          address: {
            type: 'string',
            description: 'User address',
            example: '123 Main Street, New York, NY 10001'
          },
          role: {
            type: 'string',
            enum: ['admin', 'user'],
            description: 'User role',
            example: 'user'
          }
        },
        required: ['firstName', 'lastName', 'email']
      }
    }
    #swagger.responses[201] = {
      description: 'User created successfully',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          data: {
            type: 'object',
            properties: {
              _id: { type: 'string', example: '60d5ec49fcd2b2001f8e4c23' },
              firstName: { type: 'string', example: 'John' },
              lastName: { type: 'string', example: 'Doe' },
              email: { type: 'string', example: 'john.doe@example.com' },
              phone: { type: 'string', example: '+1234567890' },
              address: { type: 'string', example: '123 Main Street, New York, NY 10001' },
              role: { type: 'string', example: 'user' },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: 'Bad Request - Validation error or email already exists',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          error: { type: 'string', example: 'Email already exists' }
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
    const { error } = userCreateSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, error: error.details[0].message });

    const user = new User(req.body);
    await user.save();

    res.status(201).json({ success: true, data: user });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ success: false, error: 'Email already exists' });
    }
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Get all users'
    #swagger.description = 'Retrieves a list of all users'
    #swagger.parameters['page'] = {
      in: 'query',
      description: 'Page number for pagination',
      type: 'integer',
      example: 1
    }
    #swagger.parameters['limit'] = {
      in: 'query',
      description: 'Number of users per page',
      type: 'integer',
      example: 10
    }
    #swagger.parameters['role'] = {
      in: 'query',
      description: 'Filter by user role',
      type: 'string',
      enum: ['admin', 'user'],
      example: 'user'
    }
    #swagger.parameters['search'] = {
      in: 'query',
      description: 'Search users by name or email',
      type: 'string',
      example: 'john'
    }
    #swagger.responses[200] = {
      description: 'Users retrieved successfully',
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
                firstName: { type: 'string', example: 'John' },
                lastName: { type: 'string', example: 'Doe' },
                email: { type: 'string', example: 'john.doe@example.com' },
                phone: { type: 'string', example: '+1234567890' },
                address: { type: 'string', example: '123 Main Street, New York, NY 10001' },
                role: { type: 'string', example: 'user' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' }
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
    const users = await User.find();
    res.json({ success: true, count: users.length, data: users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get single user
exports.getUserById = async (req, res) => {
  /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Get user by ID'
    #swagger.description = 'Retrieves a specific user by their ID'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'User ID',
      required: true,
      type: 'string',
      example: '60d5ec49fcd2b2001f8e4c23'
    }
    #swagger.responses[200] = {
      description: 'User retrieved successfully',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          data: {
            type: 'object',
            properties: {
              _id: { type: 'string', example: '60d5ec49fcd2b2001f8e4c23' },
              firstName: { type: 'string', example: 'John' },
              lastName: { type: 'string', example: 'Doe' },
              email: { type: 'string', example: 'john.doe@example.com' },
              phone: { type: 'string', example: '+1234567890' },
              address: { type: 'string', example: '123 Main Street, New York, NY 10001' },
              role: { type: 'string', example: 'user' },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' }
            }
          }
        }
      }
    }
    #swagger.responses[404] = {
      description: 'User not found',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          error: { type: 'string', example: 'User not found' }
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
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Update user'
    #swagger.description = 'Updates an existing user with new information'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'User ID',
      required: true,
      type: 'string',
      example: '60d5ec49fcd2b2001f8e4c23'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated user information',
      required: true,
      schema: {
        type: 'object',
        properties: {
          firstName: {
            type: 'string',
            description: 'User first name',
            example: 'Jane'
          },
          lastName: {
            type: 'string',
            description: 'User last name',
            example: 'Smith'
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'User email address',
            example: 'jane.smith@example.com'
          },
          phone: {
            type: 'string',
            description: 'User phone number',
            example: '+1987654321'
          },
          address: {
            type: 'string',
            description: 'User address',
            example: '456 Oak Avenue, Los Angeles, CA 90210'
          },
          role: {
            type: 'string',
            enum: ['admin', 'user'],
            description: 'User role',
            example: 'admin'
          }
        }
      }
    }
    #swagger.responses[200] = {
      description: 'User updated successfully',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          data: {
            type: 'object',
            properties: {
              _id: { type: 'string', example: '60d5ec49fcd2b2001f8e4c23' },
              firstName: { type: 'string', example: 'Jane' },
              lastName: { type: 'string', example: 'Smith' },
              email: { type: 'string', example: 'jane.smith@example.com' },
              phone: { type: 'string', example: '+1987654321' },
              address: { type: 'string', example: '456 Oak Avenue, Los Angeles, CA 90210' },
              role: { type: 'string', example: 'admin' },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' }
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
          error: { type: 'string', example: 'Invalid email format' }
        }
      }
    }
    #swagger.responses[404] = {
      description: 'User not found',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          error: { type: 'string', example: 'User not found' }
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
    const { error } = userUpdateSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, error: error.details[0].message });

    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });

    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Delete user'
    #swagger.description = 'Deletes a user by their ID'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'User ID',
      required: true,
      type: 'string',
      example: '60d5ec49fcd2b2001f8e4c23'
    }
    #swagger.responses[200] = {
      description: 'User deleted successfully',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'User deleted successfully' }
        }
      }
    }
    #swagger.responses[404] = {
      description: 'User not found',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          error: { type: 'string', example: 'User not found' }
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
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });

    res.json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};