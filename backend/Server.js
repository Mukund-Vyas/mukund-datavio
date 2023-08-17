const express = require('express');
const mangoose = require('mongoose');
const authRoutes = require('./router/Authentication');
const dataRoutes = require('./router/Data')
const { default: mongoose } = require('mongoose');

const app = express();
app.use(express.json());
require('dotenv').config();
mongoose.connect(process.env.Mongo_URL).
    then(()=>{
        console.log("MongoDB COnnected ..!");
    }).catch(err=>console.error("Error in MOngoDB Connection",err));
    app.use('/auth',authRoutes);
    app.use('/data',dataRoutes)

    const PORT = process.env.PORT || 3000 ;
    app.listen(PORT,()=>{
        console.log("server is running");
    });