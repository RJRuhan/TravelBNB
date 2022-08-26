const {
    execute,
    executeMany,
    executeWithoutClosingConnection,
    newId,
} = require('./oracle.connect');

async function editTA(data){
    const ta = data.body;
    const params = [ta.title,
        ta.street, ta.description, ta.type, ta.url, ta.taID];
    const query = `Update TouristAttraction set TITLE=:1, STREET=:2, DESCRIPTION=:3, TYPE=:4, URL=:5 where TAID=:6;`;
    const options = {
        autoCommit:true,
    };

    const result = await execute(query,params,options);

    console.log(result.rows);

    return result;
}

async function findTAbyID(id){
    const params = [id];
    const query = `SELECT TouristAttraction.*, LOCATION.COUNTRY, LOCATION.CITY
     FROM TOURISTATTRACTION, LOCATION
    WHERE TOURISTATTRACTION.LOCATIONID = LOCATION.LOCATIONID 
    AND TAID=:1;`;
    const options = {};

    const result = await execute(query, params, options);

    return result;
}

async function findPropertybyID(id){
    const params = [id];
    const query = `SELECT PROPERTY.PROPERTYNAME, (AIRBNBUSER.FIRSTNAME || ' ' || AIRBNBUSER.LASTNAME) AS HOSTNAME, PROPERTY.PROPERTYID
                    FROM PROPERTYREVIEW, PROPERTY, AIRBNBUSER
                    WHERE PROPERTYREVIEW.PROPERTYID=PROPERTY.PROPERTYID
                    AND PROPERTY.HOSTID=AIRBNBUSER.USERID
                    AND PROPERTYREVIEW.REVIEWID=:1;`
    const options = {};
    const result = await execute(query, params, options);
    return result;
}

async function editReview(data){

    const params = [data.body.propertyID, data.user.USERID, data.body.desc, data.body.rating];
    const query = `
                    BEGIN
                        EDITREVIEW(:1, :2, :3, :4);
                    END;`;
    const options = {
        autoCommit:true,
    };

    const result = await execute(query,params,options);

    // console.log(result.rows);

    return result;
}

async function editTAReview(data){
    const params = [data.body.taID, data.user.USERID, data.body.desc, data.body.rating];
    const query = `
                    BEGIN
                        EDITTAREVIEW(:1, :2, :3, :4);
                    END;`;
    const options = {
        autoCommit:true,
    };

    const result = await execute(query,params,options);

    // console.log(result.rows);

    return result;
}

async function InsertTAImages(taID, filepath){

    const params = [taID, filepath];
    const query = "INSERT INTO TAPHOTO(taID ,imagefile) VALUES(:1,:2)";
    const options = {
        autoCommit: true,
    };

    const result = await execute(query,params,options);

    // console.log(result);

    return result;

}

module.exports = {
    editReview,
    editTAReview,
    editTA,
    findTAbyID,
    findPropertybyID,
    InsertTAImages
}