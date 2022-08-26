const {
    execute,
    executeMany,
    executeWithoutClosingConnection,
    newId,
} = require('./oracle.connect');

async function removeProperty(id){
    const params=[id];
    const query = `DELETE FROM PROPERTY WHERE PROPERTYID = :1;`;
    const options = {};
    const result = await execute(query,params,options);

    console.log(result.rows);
    return result;
}

async function removeWishlist(data){//needs change
    const params=[data.guestid, data.propertyid];
    const query = `DELETE FROM WISHLIST WHERE GUESTID = :1 AND PROPERTYID = :2;`;
    const options = {};
    const result = await execute(query, params, options);

    console.log(result.rows);
    return result;
}

async function removeUserAdmin(id){
    const params = [id];
    const query = `BEGIN
                    REMOVEUSER(:1);
                    END;
                    `;
    const options = {};
    const result = await execute(query, params, options);

    console.log(result.rows);
    return result;
}

async function removePropertyAdmin(id){
    const params = [id];
    const query = `UPDATE PROPERY SET TYPE="BLOCK" WHERE PROPERTYID = :1;`;
    const options = {};
    const result = await execute(query, params, options);

    console.log(result.rows);
    return result;
}

async function removePropertyReview(id){
    const params = [id];
    const query = `DELETE FROM PROPERTYREVIEW WHERE REVIEWID = :1;`;
    const options = {};
    const result = await execute(query, params, options);

    console.log(result.rows);
    return result;
}

async function removeTAReview(id){
    const params = [id];
    const query = `DELETE FROM TAREVIEW WHERE REVIEWID = :1;`;
    const options = {};
    const result = await execute(query, params, options);

    console.log(result.rows);
    return result;
}

async function cancelResevation(id){
    const params = [id];
    const query = `DELETE FROM RESERVATION WHERE RESERVATIONID = :1;`;
    const options = {};
    const result = await execute(query, params, options);

    console.log(result.rows);
    return result;
}

async function removeTAAdmin(id){
    const params=[id];
    const query = `DELETE FROM TOURISTATTRACTION WHERE TAID = :1;`;
    const options = {};
    const result = await execute(query, params, options);

    console.log(result.rows);
    return result;
}

module.exports = {
    removeProperty,
    removeWishlist,
    removeUserAdmin,
    removePropertyAdmin,
    removePropertyReview,
    removeTAReview,
    cancelResevation,
    removeTAAdmin
}