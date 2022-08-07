const express = require('express');
const multer = require('multer');
const path = require('path');

const {
    httpAddNewUser,
    httpGetUserById,
    httpGetUsers,
    httpLogIn,
    httpAddUserImage,
} = require('./users.controller');


const fileStorageEngine = multer.diskStorage({

    destination: (req,file,cb) => {
        cb(null,"public/images/usersProfilePic");
    },

    filename: (req,file,cb) => {
        cb(null,Date.now() + '--' + file.originalname);
    }
});

const upload = multer({ 
    storage:fileStorageEngine,
    limits: { fileSize: 1024*1024*5 }    

});

const usersRouter = express.Router();

usersRouter.post('/add',httpAddNewUser);
usersRouter.post('/login',httpLogIn);

usersRouter.post("/imgUpload",upload.single("image"),httpAddUserImage);


usersRouter.get('/:id',httpGetUserById);
usersRouter.get('/',httpGetUsers);






module.exports = usersRouter;