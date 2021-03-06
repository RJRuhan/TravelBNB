const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const usersRouter = require('./routes/users/users.router');

const app = express();

app.use(cors());

app.use(morgan('combined'));

app.use(express.json());
app.use(express.static(path.join(__dirname,'..','public')));

app.use('/users',usersRouter);

app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','public','index.html'));
});

module.exports = app;