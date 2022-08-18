const express = require('express');
const { verify } = require('../../middlewares/userVerify');
const {
    httpSearchProperty,
    renderSearchProperties,
    httpFilterProperties,
    httpAddNewProperty,
    httpAddPropertyImage,
    httpAddPropertyAmenities,
    httpAddReview,
    httpEditProperty,
    httpEditPropertyAmenities,
    renderEditPropertyPage,
} = require('./property.controller');

const multer = require('multer');

const fileStorageEngine = multer.diskStorage({

    destination: (req,file,cb) => {
        cb(null,"public/images/propertypics");
    },

    filename: (req,file,cb) => {
        cb(null,Date.now() + '--' + file.originalname);
    }
});

const upload = multer({ 
    storage:fileStorageEngine,
    limits: { fileSize: 1024*1024*5 }    

});

const propertyRouter = express.Router();

propertyRouter.post('/search',verify,httpSearchProperty);
propertyRouter.post('/filter',verify,httpFilterProperties);

propertyRouter.get('/addProperty',verify,(req,res)=>{
    res.render('addProperty.ejs');
});

propertyRouter.post('/addProperty/add',verify,upload.array('pictures',5),httpAddNewProperty,httpAddPropertyImage,httpAddPropertyAmenities);


propertyRouter.get('/editProperty',verify,renderEditPropertyPage);

propertyRouter.post('/editProperty/edit',verify,upload.array('pictures',5),httpEditProperty,httpAddPropertyImage,httpEditPropertyAmenities);





propertyRouter.get('/addReview',verify,(req,res)=>{
    res.render('addReview.ejs',{
        pid: 2,
        property: "Villa",
        host: "DJ",
    });
})

propertyRouter.post('/addReview/add',verify,httpAddReview);


// propertyRouter.get('/searchProperties',renderSearchProperties);

// propertyRouter.post('/searchProperties',renderSearchProperties);



module.exports = propertyRouter;