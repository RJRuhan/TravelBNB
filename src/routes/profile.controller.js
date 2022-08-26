const {
    findOwnedProperties,
    findProfileInfo, 
    findIfHost
} = require('../../models/profile.oracle');

async function renderProfilePage(req, res)
{
    var result1 = await findProfileInfo(req.params.id);
    var host = await findIfHost(req.params.id);
    var result2 = await findOwnedProperties(req.params.id);

    res.render('profile.ejs', {
        result1:result1,
        host:host,
        result2:result2
    });
}

module.exports = {
    renderProfilePage
}