const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const usersRouter = require('./routes/users/users.router');
const authRouter = require('./routes/auth/auth.router');
const propertyRouter = require('./routes/property/property.router');


const app = express();

app.use(cors());

app.use(morgan('combined'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname,'..','public')));

app.set('views','./public')
app.set('view engine', 'ejs')

app.use('/users',usersRouter);
app.use('/auth',authRouter);
app.use('/property',propertyRouter);

app.get('/signup',(req,res)=>{
    res.render('signup.ejs');
})

app.get('/index',(req,res)=>{
    res.render('index');
})


app.get('/login',(req,res)=>{
    res.render('login.ejs');
});



app.get('/*',(req,res)=>{
    res.render('login.ejs');
});

module.exports = {
    app,
};