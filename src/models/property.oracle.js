const {
    execute,
    executeMany,
    executeWithoutClosingConnection,
    newId,
} = require('./oracle.connect');


async function findProperty(data){

    const params = [data.destination,data.checkIn,data.checkOut];
    const query = `SELECT *
    FROM PROPERTY p,LOCATION l,PROPERTYPHOTO pp
    WHERE p.LOCATIONID = l.LOCATIONID AND p.PROPERTYID = pp.PROPERTYID
    AND COUNTRY = :1
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

    const params = [user.USERID,property.pName,property.price,data.locationID,
        property.street,property.description,property.type,property.baths,property.bedrooms,property.guest_no,
        property.is_refund,property.aval_from,property.aval_until];
    const query = `INSERT INTO 
    PROPERTY(hostid, propertyname, pricepernight, locationid, street, description, housetype, bathroomcnt, bedroomcnt, guestnum, isrefundable, availablefrom, availableupto)
    values(:1,:2,:3,:4,:5,:6,:7,:8,:9,:10,:11, TO_DATE(:12, 'yyyy-mm-dd'), TO_DATE(:13, 'yyyy-mm-dd')) `;
    const options = {
        autoCommit:true,
    };

    const result = await execute(query,params,options);

    // console.log(result.rows);

    return result;
}


async function findLocation(data){

    const params = [data.country,data.city];
    const query = `SELECT *
    FROM LOCATION l
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

    // console.log(result);

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
}