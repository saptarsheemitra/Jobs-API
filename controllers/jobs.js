const Job = require("../models/jobs");
const { StatusCodes } = require('http-status-codes');


const test = (req, res) => {
    res.send("Working");
};

const getAllJobs = async (req, res) => {
    const allJobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt');
    res.status(StatusCodes.OK).send({ jobs: allJobs, count: allJobs.length });
}

const getJob = async (req, res) => {
    const { user: { userId }, params: { id: jobID } } = req

    try {
        const singleJob = await Job.findOne({ _id: jobID, createdBy: userId });
        if (!singleJob) {
            return res.status(StatusCodes.NOT_FOUND).send("Job not present");
        }
        res.status(StatusCodes.OK).send({ singleJob });
    } catch (error) {
        if(error.name === "CastError"){
            return res.status(StatusCodes.NOT_FOUND).send("No item found")
        }
        res.status(StatusCodes.BAD_REQUEST).send(error)
    }

}
const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).send(job);
}

const updateJob = async (req, res) => {
    const { user: { userId }, params: { id: jobID }, body: { company, position } } = req;

    if (!company || !position) {
        return res.status(StatusCodes.NOT_FOUND).send("Field cannot be empty");
    }

    try {
        const updatedJob = await Job.findOneAndUpdate(
            { _id: jobID, createdBy: userId },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedJob) {
            return res.status(StatusCodes.NOT_FOUND).send("Job not present");
        }

        res.status(StatusCodes.NOT_FOUND).send(updatedJob);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).send(error);
    }
}

const deleteJob = async (req, res) => {
    const { user: { userId }, params: { id: jobID } } = req;
    try {
        const deletedJob = await Job.findOneAndDelete({ _id: jobID, createdBy: userId })
        if (!deletedJob) {
            return res.status(StatusCodes.NOT_FOUND).send("Job not found")
        }
        res.status(StatusCodes.OK).send(deletedJob);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).send(error);
    }

}
module.exports = { test, getAllJobs, getJob, createJob, updateJob, deleteJob };