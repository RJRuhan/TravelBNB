const {
    findProperty,
} = require('./property.oracle');

async function searchProperty(data){
    return await findProperty(data);
    
}

module.exports = {
    searchProperty,
};