const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const usersRouter = require('./routes/users/users.router');
const authRouter = require('./routes/auth/auth.router');
const propertyRouter = require('./routes/property/property.router');
const adminRouter = require('./routes/admin/admin.router');


const {
    verify,
} = require('./middlewares/userVerify');
const { httpGetUserPhoto } = require('./routes/users/users.controller');


const app = express();

app.use(cors());

app.use(morgan('combined'))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname,'..','public')));

app.set('views','./public')
app.set('view engine', 'ejs')

app.use('/users',usersRouter);
app.use('/auth',authRouter);
app.use('/property',propertyRouter);
app.use('/admin',adminRouter);

app.get('/',(req,res)=>{
    res.render('login.ejs',{
        message:'',
        user:{
            email:null,
            password:null,
        },
    });
});

app.get('/signup',(req,res)=>{
    res.render('signup.ejs',{
        message:'',
    });
})

app.get('/index',verify,httpGetUserPhoto,(req,res)=>{
    console.log(req.user);

    const result = req.query;
    
    if(!result.success || !result.found){
        return res.render('index.ejs',{
            image:'/images/defaultUser.jpg',
        })
    }

    return res.render('index.ejs',{
        image:result.data.rows[0].PROFILEIMG,
    })
})


app.get('/login',(req,res)=>{
    res.render('login.ejs',{
        message:'',
        user:{
            email:null,
            password:null,
        },
    });
});


app.get('/*',(req,res)=>{
    res.sendStatus(404);
});

module.exports = {
    app,
};