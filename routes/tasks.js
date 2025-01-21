const express = require('express');
const Task = require('../models/Task');
const { verifyToken } = require('../middlewear/auth');

const router = express.Router();

router.use(verifyToken);

router.post('/', async (req, res) => {
    const { title, completed, dueDate, priority } = req.body;
    const userId = req.user.id;  

    try {
        const task = new Task({ title, completed, dueDate, priority, userId });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: 'Error creating task', error: error.message });
    }
});

router.get('/', async (req, res) => {
    const userId = req.user.id;

    try {
        const tasks = await Task.find({ userId });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, completed, dueDate, priority } = req.body;

    try {
        const task = await Task.findByIdAndUpdate(id, { title, completed, dueDate, priority }, { new: true });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (error) {
        res.status(400).json({ message: 'Error updating task', error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findByIdAndDelete(id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.status(204).send();  
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error: error.message });
    }
});

module.exports = router;
