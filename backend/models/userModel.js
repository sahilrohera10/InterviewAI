const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  photo_url: {
    type: String,
    trim: true,  // In case URL has extra spaces
  },

  average_rating: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
    default: 0, // Optional: default rating 0
  },

  interview_count: {
    type: Number,
    required: true,
    default: 0, // Good to have a default count
    min: 0, // No negative interview counts
  }
}, 
{
  timestamps: true // Adds createdAt and updatedAt automatically
});

const UserModel = mongoose.model('users', userSchema);

module.exports = { UserModel };