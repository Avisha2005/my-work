const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost/project-management', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define Task Schema
const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: {
        type: String,
        enum: ['Todo', 'InProgress', 'Done'],
        default: 'Todo',
    },
});

const Task = mongoose.model('Task', taskSchema);

// API Endpoints
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/tasks', async (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
    });
    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
document.addEventListener('DOMContentLoaded', () => {
    fetchTasks();
});

async function fetchTasks() {
    const response = await fetch('/api/tasks');
    const tasks = await response.json();

    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task');
        taskItem.innerHTML = `
            <h2>${task.title}</h2>
            <p>${task.description}</p>
            <p>Status: ${task.status}</p>
        `;
        taskList.appendChild(taskItem);
    });
}
