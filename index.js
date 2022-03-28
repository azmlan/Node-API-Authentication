const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
// connect db
mongoose.connect(process.env.DB_CONNECT,()=>{console.log('Connected To db ')});
 

// Import Routes 
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');


//Middlewares 
app.use(express.json());

// Routes Middlwares 
app.use('/api/user',authRoutes);
app.use('/api/posts',postsRoutes);









app.listen(3000,()=>{console.log('up and running')});