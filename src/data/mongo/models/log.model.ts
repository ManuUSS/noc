import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low'
  },
  origin: String,
  createdAt: {
    type: Date,
    default: new Date()
  }
});

export const LogModel = mongoose.model('Log', logSchema);