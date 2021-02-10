const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
const url = process.env.DB;

mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true,useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('MongoDB database connection established successfully');
})

const postRouter = require('./routes/posts');
const authRouter = require('./routes/users');
const connectRouter = require('./routes/connect');

app.get('/',(req,res)=>{
    res.send('Hello from MediSocial API');
})

app.use('/auth', authRouter);
app.use('/posts', postRouter);
app.use('/connect', connectRouter)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})