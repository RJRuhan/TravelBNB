const {
    searchProperty,
} = require('../../models/property.model.js')

async function httpSearchProperty(req,res){
    const result = await searchProperty(req.body);

    if(!result.success){
        return res.status(500).json({
            error:"Internal Server Error"
        });
    }

    return res.status(200).json(result.data.rows);
}

module.exports = {
    httpSearchProperty
};