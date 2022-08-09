const {
    searchProperty,
} = require('../../models/property.model.js')

async function httpSearchProperty(req,res){
    console.log('toot');
    console.log(req.body);
    let result = await searchProperty(req.body);

    if(!result.success){
        return res.status(500).json({
            error:"Internal Server Error"
        });
    }

    result = result.data.rows;

    console.log(result);

    res.render('searchProperties.ejs', {
        country:req.body.country,
        result:result,
    })
}

async function renderSearchProperties(req,res){

    var country="Bangladesh";
    var result = await searchProperty({"dest":"Bangladesh"});
    result = result.data.rows;
    console.log(result);
    res.render('searchProperties.ejs', {
        country:country,
        result:result,
    })

}

module.exports = {
    httpSearchProperty,
    renderSearchProperties,
};