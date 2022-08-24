const {
    searchProperty,
    filterProperty,
    addProperty,
    existsLocation,
    addNewLocation,
    checkProperty,
} = require('../../models/property.model.js');

const { 
    findPropertyByRowId,
    InsertPropertyImage, 
    InsertNewPropertyAmenities,
    InsertReview,
    EditProperty,
    EditAmenities, 
    findPropertyById,
    findLocationById,
    findPropertyAmenity,
    findLocationFunc,
} = require('../../models/property.oracle.js');

async function httpSearchProperty(req, res) {
    console.log(req.body);

    let result = await searchProperty(req.body);

    if (!result.success) {
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }

    result = result.data.rows;

    console.log(result);

    res.render('searchProperties.ejs', {
        country: req.body.destination,
        result: result,
    })
}

async function httpFilterProperties(req, res) {
    console.log(req.body);

    var result = await filterProperty(req.body);

    if (!result.success) {
        return res.status(500).json({
            error: "Internal Server Error"
        });

    }

    result = result.data.rows;
    console.log(result);


    res.render('searchProperties.ejs', {
        country: req.body.country,
        result: result,
    })
}

async function httpAddNewProperty(req, res, next) {
    console.log(req.body);

    // console.log(req.user);

    var result = await findLocationFunc(req.body);

    console.log(result);

    req.locationID = result.data.outBinds.locationID;
    
    result = await addProperty(req);

    if (!result.success) {
        return res.status(500).json({
            error: "Internal Server Error"
        });

    }

    console.log(result.data);

    result = await findPropertyByRowId(result.data);

    if (!result.success)
        return res.status(500).json({
            error: "Internal Server Error"
        });

    req.property = result.data.rows[0];

    console.log(req.property);

    next();

}

async function httpAddPropertyImage(req, res, next) {
    console.log(req.files);


    if (!req.files)
        return res.redirect('/index');

    for (const file of req.files) {
        const result = await InsertPropertyImage(req.property.PROPERTYID, '/images/propertypics/' + file.filename);

        if (!result.success)
            return res.status(500).json({
                error: "Internal Server Error"
            });
    }

    next();
}

function checkAmenity(req) {

    if (req.body.amn_wifi)
        req.body.amn_wifi = 1;
    else
        req.body.amn_wifi = 0;

    if (req.body.amn_ac)
        req.body.amn_ac = 1;
    else
        req.body.amn_ac = 0;

    if (req.body.amn_tv)
        req.body.amn_tv = 1;
    else
        req.body.amn_tv = 0;

    if (req.body.amn_kitchen)
        req.body.amn_kitchen = 1;
    else
        req.body.amn_kitchen = 0;

    if (req.body.amn_heater)
        req.body.amn_heater = 1;
    else
        req.body.amn_heater = 0;

    if (req.body.amn_washer)
        req.body.amn_washer = 1;
    else
        req.body.amn_washer = 0;

    if (req.body.amn_iron)
        req.body.amn_iron = 1;
    else
        req.body.amn_iron = 0;


    if (req.body.amn_dryer)
        req.body.amn_dryer = 1;
    else
        req.body.amn_dryer = 0;

    if (req.body.amn_parking)
        req.body.amn_parking = 1;
    else
        req.body.amn_parking = 0;


    if (req.body.amn_pool)
        req.body.amn_pool = 1;
    else
        req.body.amn_pool = 0;


    if (req.body.amn_gym)
        req.body.amn_gym = 1;
    else
        req.body.amn_gym = 0;


    if (req.body.amn_front)
        req.body.amn_front = 1;
    else
        req.body.amn_front = 0;


    if (req.body.amn_back)
        req.body.amn_back = 1;
    else
        req.body.amn_back = 0;


}


async function httpAddPropertyAmenities(req, res) {


    checkAmenity(req);

    console.log(req.body);
    

    const result = await InsertNewPropertyAmenities(req);

    if (!result.success)
        return res.status(500).json({
            error: "Internal Server Error"
        });


    res.redirect('/index');
}

async function renderSearchProperties(req, res) {

    var country = "Bangladesh";
    var result = await searchProperty({ "dest": "Bangladesh" });
    result = result.data.rows;
    console.log(result);
    res.render('searchProperties.ejs', {
        country: country,
        result: result,
    })

}


async function httpAddReview(req,res){

    console.log(req.body);
    var result = await InsertReview(req);

    if (!result.success)
        return res.status(500).json({
            error: "Internal Server Error"
        });

    console.log(result);
    res.redirect('/index');


}

async function httpEditProperty(req,res,next){

    console.log(req.body);
    checkProperty(req);

    var result = await EditProperty(req);

    if (!result.success)
        return res.status(500).json({
            error: "Internal Server Error"
        });


    console.log(result);

    req.property = {
        PROPERTYID : req.body.propertyid,
    }
    next();

}

async function httpEditPropertyAmenities(req,res){

    checkAmenity(req);

    var result = await EditAmenities(req);

    console.log(result);

    res.redirect('/index');

}

async function renderEditPropertyPage(req,res){

    req.body.propertyid = 2;

    var result = await findPropertyById(req.body);

    result = result.data.rows;

    req.body.locationid = result[0].LOCATIONID;

    var result2 = await findLocationById(req.body);

    result[0].CITY = result2.data.rows[0].CITY;
    result[0].COUNTRY = result2.data.rows[0].COUNTRY;

    result[0].HOUSETYPE = result[0].HOUSETYPE.trim();

    var result3 = await findPropertyAmenity(req.body);

    result[0].amenities = result3.data.rows[0];

    console.log(result);

    res.render('editProperty.ejs',{
        result:result,
    });

}

module.exports = {
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
};