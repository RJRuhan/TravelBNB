const {
    findProperty,
    findPropertyByAmenities,
    insertProperty,
    findLocation,
    insertLocation,
} = require('./property.oracle');

async function searchProperty(data){
    return await findProperty(data);
    
}

async function filterProperty(data){
    if (data.amn_wifi = "wifi")
        data.amn_wifi = '1';
    if( data.amn_gym = "gym" )
        data.amn_gym = '1';

    data.min_price = Number(data.min_price);
    data.max_price = Number(data.max_price);
    data.rating = Number(data.rating);
    data.bedrooms = Number(data.bedrooms);
    data.beds = Number(data.beds);
    data.bath = Number(data.bath);



    console.log(data);
    return await findPropertyByAmenities(data);
    
}

async function existsLocation(data){

    const result = await findLocation(data);

    if( result.success ){

        const location = result.data.rows;

        if( location.length === 0 )
            return {
                success:true,
                found:false,
            };

        return {
            success:true,
            found:true,
            data:result.data,
        };
    }

    return{
        success:false,
    };
}

async function addProperty(data){

    data.body.bedrooms = Number(data.body.bedrooms);
    data.body.baths = Number(data.body.baths);
    data.body.guest_no = Number(data.body.guest_no);
    data.body.price = Number(data.body.price);

    if( data.body.is_refund == 'no' )
        data.body.is_refund = '0';
    else
        data.body.is_refund = '1';

    console.log(data.body);


    return await insertProperty(data);
    
}

async function addNewLocation(data){
    return await insertLocation(data);
    
}

module.exports = {
    searchProperty,
    filterProperty,
    addProperty,
    existsLocation,
    addNewLocation,
};