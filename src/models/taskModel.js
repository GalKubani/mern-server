const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    description: { type: String, required: true, trim: true },
    active: { type: Boolean, default: true }
});
const Task = mongoose.model('Task', taskSchema);
module.exports = Task