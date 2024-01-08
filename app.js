require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000
//connectDB
const connectDB = require('./config/connectDB');

//routes import
const jobsRoutes = require('./routes/jobs');
const authRoutes = require('./routes/auth');


//middlewares
app.use(express.json());

//routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/jobs',jobsRoutes);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, ()=>{
            console.log(`Server running on port ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();