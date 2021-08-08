const Task = require('../models/taskmodel')
const express = require('express');
const router = new express.Router()

router.post('/tasks', async (req, res) => {
    const task = new Task({ ...req.body, })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})
router.get('/tasks', async (req, res) => {
    try {
        let Tasks = await Task.find()
        res.send(Tasks)
    } catch (error) {
        res.status(404).send(error);
    }
})
router.get('/task', async (req, res) => {
    try {
        let task = await Task.findOne({ _id: req.query.id })
        res.send(task)
    } catch (error) {
        res.status(404).send(error);
    }
})
router.patch('/tasks', async (req, res) => {
    const update = Object.keys(req.body)
    const isValidOperation = update.every(() => allowedUpdates.includes('completed'))
    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid updates!" })
    }
    try {
        const task = await Task.findOne({ _id: req.query.id })
        if (!task) { return res.status(404).send(); }
        task.active = !task.active;
        await task.save()
        res.send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})
router.delete('/tasks', async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.query.id })
        if (!task) { return res.status(404).send(); }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})
module.exports = router