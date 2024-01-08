

const test = (req, res) => {
    res.send("Working");
};

const getAllJobs = async (req, res) => {
    res.send("All jobs");
}

const getJob = async (req, res) => {
    res.send("Job");
}
const createJob = async (req, res) => {
    res.send("Job created");
}

const updateJob = async (req, res) => {
    res.send("Job updated");
}

const deleteJob = async (req, res) => {
    res.send("Job deleted");
}
module.exports = { test, getAllJobs, getJob, createJob, updateJob, deleteJob };