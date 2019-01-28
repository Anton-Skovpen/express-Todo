const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Items

let todoSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Todo', todoSchema);
