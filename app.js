require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000
// extra security pkgs
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

//connectDB
const connectDB = require('./config/connectDB');
const authUser = require('./middlewares/authentication');

//routes import
const jobsRoutes = require('./routes/jobs');
const authRoutes = require('./routes/auth');


//middlewares
app.set('trust proxy', 1)
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
}))
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

//routes
app.get('/',(req,res)=>{
    res.send("Job API");
})
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/jobs', authUser, jobsRoutes);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();