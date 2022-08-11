const express = require('express');
const { verify } = require('../../middlewares/userVerify');
const {
    httpSearchProperty,
    renderSearchProperties,
    httpFilterProperties,
    httpAddNewProperty,
    httpAddPropertyImage,
    httpAddPropertyAmenities,
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
propertyRouter.post('/add',verify,upload.array('pictures',3),httpAddNewProperty,httpAddPropertyImage,httpAddPropertyAmenities);




// propertyRouter.get('/searchProperties',renderSearchProperties);

// propertyRouter.post('/searchProperties',renderSearchProperties);



module.exports = propertyRouter;