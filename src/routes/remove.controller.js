const {
    removeProperty,
    removeWishlist,
    removeUserAdmin,
    removePropertyAdmin,
    removePropertyReview,
    removeTAReview,
    cancelResevation
} = require('../../models/remove.oracle');

async function httpRemoveUser(req, res){
    var result = await removeUserAdmin(req.params.id);
    if(!result.success)
    {
        return res.status(500).json({
            error:"Internal Server Error"
        });
    }
    console.log(result);
    res.redirect('/admin/removeUser');
}

async function httpRemovePropertyAdmin(req, res){
    var result = await removePropertyAdmin(req.params.id);
    if(!result.success)
    {
        return res.status(500).json({
            error:"Internal Server Error"
        });
    }
    console.log(result);
    res.redirect('/admin/removeProperty');
}

module.exports ={
    httpRemovePropertyAdmin,
    httpRemoveUser
}