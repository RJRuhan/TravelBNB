const {
    execute,
    executeMany,
    executeWithoutClosingConnection,
    newId,
} = require('./oracle.connect');

const oracledb = require('oracledb');

async function findPropertyById(data){

    const params = [data.propertyid];
    const query = `SELECT PROPERTY.*,TO_CHAR(AVAILABLEFROM, 'yyyy-mm-dd') AS AVAILFROM,TO_CHAR(AVAILABLEUPTO, 'yyyy-mm-dd') AS AVAILUPTO 
    FROM PROPERTY WHERE PROPERTYID = :1`;
    const options = {};

    const result = await execute(query,params,options);

    // console.log(result.rows);

    return result;
}


async function findProperty(data){

    const params = [data.destination,data.checkIn,data.checkOut];
    const query = `SELECT *
    FROM PROPERTY p,LOCATION l,PROPERTYPHOTO pp
    WHERE p.LOCATIONID = l.LOCATIONID AND p.PROPERTYID = pp.PROPERTYID
    AND CITY = :1
    AND AVAILABLEFROM <= TO_DATE(:2,'YYYY-MM-DD') AND AVAILABLEUPTO >= TO_DATE(:3,'YYYY-MM-DD') `;
    const options = {};

    const result = await execute(query,params,options);

    // console.log(result.rows);

    return result;
}

async function findPropertyByAmenities(data){

    const params = [data.country,data.type_guesthouse,data.min_price,data.max_price,data.rating,data.bedrooms,data.bath,
        data.amn_wifi,data.amn_gym];

    const query = `SELECT *
    FROM PROPERTY p,LOCATION l,PROPERTYAMENITIES pa,PROPERTYPHOTO pp
    WHERE p.LOCATIONID = l.LOCATIONID AND p.PROPERTYID = pa.PROPERTYID AND p.PROPERTYID = pp.PROPERTYID
    AND UPPER(TRIM(COUNTRY)) = UPPER(TRIM(:1))
    AND UPPER(TRIM(HOUSETYPE)) = UPPER(TRIM(:2)) 
    AND PRICEPERNIGHT BETWEEN :3 AND :4 
    AND AVGRATING >= :5
    AND BEDROOMCNT = :6
    AND BATHROOMCNT = :7
    AND HASWIFI = :8
    AND HASGYM = :9 `;

    const options = {};

    const result = await execute(query,params,options);

    // console.log(result.rows);

    return result;
}

async function insertProperty(data){

    const user = data.user;
    const property = data.body;
    const status = 'active';

    const params = [user.USERID,property.pName,property.price,data.locationID,
        property.street,property.description,property.type,property.baths,property.bedrooms,property.guest_no,
        property.is_refund,property.refund_period,property.refund_rate,property.aval_from,property.aval_until,status];
    const query = `INSERT INTO 
    PROPERTY(hostid, propertyname, pricepernight, locationid, street, description, housetype, bathroomcnt, bedroomcnt, guestnum, isrefundable, CancellationPeriod, RefundRate , availablefrom, availableupto,status)
    values(:1,:2,:3,:4,:5,:6,:7,:8,:9,:10,:11,:12,:13, TO_DATE(:14, 'yyyy-mm-dd'), TO_DATE(:15, 'yyyy-mm-dd') ,:16) `;
    const options = {
        autoCommit:true,
    };

    const result = await execute(query,params,options);

    // console.log(result.rows);

    return result;
}



async function findLocationById(data){

    const params = [data.locationid];
    const query = `SELECT *
    FROM LOCATION 
    WHERE LOCATIONID = :1`
    
    const options = {};

    const result = await execute(query,params,options);

    // console.log(result.rows);

    return result;
}

async function findLocation(data){

    const params = [data.country,data.city];
    const query = `SELECT *
    FROM LOCATION
    WHERE COUNTRY = :1 AND CITY = :2`
    
    const options = {};

    const result = await execute(query,params,options);

    // console.log(result.rows);

    return result;
}

async function insertLocation(data){
    const params = [ data.country,data.city];
    const query = "INSERT INTO LOCATION(country,city) VALUES(:1,:2)";
    const options = {
        autoCommit: true,
    };

    const result = await execute(query,params,options);

    // console.log(result);

    return result;
}

async function findPropertyByRowId(data){

    const params = [data.lastRowid];
    const query = `SELECT *
    FROM PROPERTY p
    WHERE ROWID = :1`;
    const options = {};

    const result = await execute(query,params,options);

    // console.log(result.rows);

    return result;
}

async function InsertPropertyImage(propertyid,filepath){

    const params = [propertyid,filepath];
    const query = "INSERT INTO PROPERTYPHOTO(propertyid,imagefile) VALUES(:1,:2)";
    const options = {
        autoCommit: true,
    };

    const result = await execute(query,params,options);

    // console.log(result);

    return result;

}

async function InsertNewPropertyAmenities(data){

    const params = [data.property.PROPERTYID,data.body.amn_wifi,data.body.amn_ac,data.body.amn_tv,data.body.amn_kitchen,
        data.body.amn_heater,data.body.amn_washer,data.body.amn_iron,data.body.amn_dryer,data.body.amn_parking,data.body.amn_pool,
        data.body.amn_gym,data.body.amn_front,data.body.amn_back];
    const query = `insert into PROPERTYAMENITIES
    VALUES(:1,:2,:3,:4,:5,:6,:7,:8,:9,:10,:11,:12,:13,:14)`;
    const options = {
        autoCommit: true,
    };

    const result = await execute(query,params,options);

    return result;

}


async function InsertReview(data){

    const params = [data.body.propertyid,data.user.USERID,data.body.desc,data.body.rating];

    const query = `
    BEGIN
	ADD_REVIEW(:1,:2,:3,:4);
    END;
    `;
    
    const options = {
        autoCommit: true,
    };

    const result = await execute(query,params,options);

    // console.log(result);

    return result;
}

async function EditProperty(data){

    const user = data.user;
    const property = data.body;

    const params = [property.pName,property.price,property.description,property.type,property.baths,property.bedrooms,
        property.guest_no,property.is_refund,property.refund_period,property.refund_rate,property.aval_from,property.aval_until,data.body.propertyid];
    const query = `UPDATE PROPERTY 
    SET PROPERTYNAME = :1,PRICEPERNIGHT = :2,DESCRIPTION = :3, HOUSETYPE = :4, BATHROOMCNT = :5,
    BEDROOMCNT = :6,GUESTNUM = :7,ISREFUNDABLE = :8,CANCELLATIONPERIOD = :9,REFUNDRATE = :10,
    AVAILABLEFROM =  TO_DATE(:11, 'yyyy-mm-dd'),AVAILABLEUPTO = TO_DATE(:12, 'yyyy-mm-dd') 
    WHERE PROPERTYID = :13 `;
    const options = {
        autoCommit:true,
    };

    const result = await execute(query,params,options);

    // console.log(result.rows);

    return result;
}

async function EditAmenities(data){

    const params = [data.body.amn_wifi,data.body.amn_ac,data.body.amn_tv,data.body.amn_kitchen,
        data.body.amn_heater,data.body.amn_washer,data.body.amn_iron,data.body.amn_dryer,data.body.amn_parking,data.body.amn_pool,
        data.body.amn_gym,data.body.amn_front,data.body.amn_back,data.property.PROPERTYID];
    const query = `UPDATE PROPERTYAMENITIES
    SET HASWIFI = :1,HASAC = :2,HASTV = :3,HASKITCHEN = :4,HASHEATING = :5,HASWASHER = :6,HASIRON = :7,HASDRYER = :8,
    HASPARKING = :9,HASPOOL = :10,HASGYM = :11,HASFRONTYARD = :12,HASBACKYARD = :13
    WHERE PROPERTYID = :14
    `;
    const options = {
        autoCommit: true,
    };

    const result = await execute(query,params,options);

    // console.log(result.rows);

    return result;
}


async function findPropertyAmenity(data){
    const params = [data.propertyid];
    const query = `SELECT *
    FROM PropertyAmenities 
    WHERE PROPERTYID = :1`
    
    const options = {};

    const result = await execute(query,params,options);

    // console.log(result.rows);

    return result;
}


async function findLocationFunc(data){
    
    const binds = {
        locationID:{
        dir: oracledb.BIND_OUT,type: oracledb.NUMBER},
        Country: data.country,
        City: data.city,
    };
    const query = `
    BEGIN
	    :locationID := find_location(:Country,:City);
    END;
    `;

    const options = {
        autoCommit:true,
    };

    const result = await execute(query,binds,options);

    console.log(result);

    return result;
}



module.exports = {
    findProperty,
    findPropertyByAmenities,
    insertProperty,
    findLocation,
    insertLocation,
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
}