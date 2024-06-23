const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost/job-board', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define Job Schema
const jobSchema = new mongoose.Schema({
    title: String,
    description: String,
    company: String,
    location: String,
    salary: String,
});

const Job = mongoose.model('Job', jobSchema);

// API Endpoints
app.get('/api/jobs', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/jobs', async (req, res) => {
    const job = new Job({
        title: req.body.title,
        description: req.body.description,
        company: req.body.company,
        location: req.body.location,
        salary: req.body.salary,
    });
    try {
        const newJob = await job.save();
        res.status(201).json(newJob);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
document.addEventListener('DOMContentLoaded', () => {
    fetchJobs();
});

async function fetchJobs() {
    const response = await fetch('/api/jobs');
    const jobs = await response.json();

    const jobList = document.getElementById('job-list');
    jobList.innerHTML = '';

    jobs.forEach(job => {
        const jobItem = document.createElement('div');
        jobItem.classList.add('job');
        jobItem.innerHTML = `
            <h2>${job.title}</h2>
            <p><strong>Company:</strong> ${job.company}</p>
            <p><strong>Description:</strong> ${job.description}</p>
            <p><strong>Location:</strong> ${job.location}</p>
            <p><strong>Salary:</strong> ${job.salary}</p>
        `;
        jobList.appendChild(jobItem);
    });
}
