const {
    execute,
    executeMany,
    executeWithoutClosingConnection,
    newId,
} = require('./oracle.connect');

async function findProfileInfo(id)
{
    const params= [id];
    const query = `SELECT FIRSTNAME, LASTNAME, EMAIL, PHONENO FROM AIRBNBUSER
                    WHERE USERID=:1;`;
    const options = {};
    const result = await execute(query, params, options);
    console.log(result.rows);
    return result;
}

async function findOwnedProperties(id)
{
    const params = [id];
    const query = `SELECT P.PROPERTYID, P.PROPERTYNAME, P.STREET, L.COUNTRY, L.CITY
                    FROM PROPERTY P, LOCATION L
                    WHERE P.LOCATIONID = L.LOCATIONID
                    AND P.HOSTID = :1;`;
    const options = {};
    const result = await execute(query, params, options);
    console.log(result.rows);
    return result;
}

async function findIfHost(id){
    const params = [id];
    var host;
    const query = `SELECT * FROM HOST WHERE HOSTID = :1;`;
    const options = {};
    const result = await execute(query, params, options);

    if(result.length!=0)
        host = true;
    else
        host = false;
    
    return host;
}

module.exports = {
    findOwnedProperties,
    findProfileInfo, 
    findIfHost
}