const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    dueDate: { type: Date },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' }
});

module.exports = mongoose.model('Task', TaskSchema);