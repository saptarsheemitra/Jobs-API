const express = require('express');
const router = express.Router();
const { test, getAllJobs, getJob, updateJob, deleteJob, createJob } = require('../controllers/jobs');

router.get('/testing', test);

router.get('/', getAllJobs); //All Jobs
router.post('/', createJob); //Create Job
router.get('/:id', getJob); //Get job by ID
router.delete('/:id', deleteJob); //Delete job by ID
router.patch('/:id', updateJob); //Update job by ID

module.exports = router;