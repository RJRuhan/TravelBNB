const express = require('express');
const { verify } = require('../../middlewares/userVerify');

const {
    httpEditReview,
    httpEditTA,
    httpEditTAReview,
    renderEditTAPage,
    renderEditReview,
    renderEditTAReview,
    httpAddTAImages
} = require('./edit.controller');

const multer = require('multer');

const fileStorageEngine = multer.diskStorage({

    destination: (req,file,cb) => {
        cb(null,"public/images/tapics");
    },

    filename: (req,file,cb) => {
        cb(null,Date.now() + '--' + file.originalname);
    }
});

const upload = multer({ 
    storage:fileStorageEngine,
    limits: { fileSize: 1024*1024*5 }    

});

const editRouter = express.Router();

//edit review
editRouter.get('/editReview/:id',verify, renderEditReview);//from myReviews page
editRouter.post('/editReview/:id',verify, httpEditReview);

//edit ta review
editRouter.get('/editReviewTA/:id',verify, renderEditTAReview);//from myReveiwsTA page
editRouter.post('/editReviewTA/:id',verify, httpEditTAReview);

//edit ta page
editRouter.get('/admin/editTA/:id',verify, renderEditTAPage);//from viewTA page
editRouter.post('/admin/editTA/:id',verify, upload.array('pictures',5), httpEditTA, httpAddTAImages);

module.exports = editRouter;