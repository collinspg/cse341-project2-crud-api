const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName:  { type: String, required: true },
    email:     { type: String, required: true, unique: true },
    phone:     { type: String },
    address:   { type: String },
    role:      { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  { timestamps: true } // This adds `createdAt` and `updatedAt` automatically
);

module.exports = mongoose.model('User', userSchema);
