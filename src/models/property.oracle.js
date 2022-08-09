const {
    execute,
    executeMany,
    executeWithoutClosingConnection,
    newId,
} = require('./oracle.connect');


async function findProperty(data){

    const params = [data.destination,data.checkIn,data.checkOut]; //,data.checkIn,data.checkOut
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


module.exports = {
    findProperty,
}