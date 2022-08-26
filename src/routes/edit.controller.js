const {
    editReview,
    editTAReview,
    editTA,
    findTAbyID,
    findPropertybyID,
    InsertTAImages
} = require('../../models/edit.oracle.js');


//edit review controller functions
async function renderEditReview(req, res){
    var result = await findPropertybyID(req.params.id);
    res.render('editReview.ejs', {
        result:result
    });
}

async function httpEditReview(req, res, next){
    console.log(req.body);
    var result=await editReview(req);

    if(!result.success)
    {
        return res.status(500).json({
            error:"Internal Server Error"
        });
    }
    console.log(result);
    res.redirect('/myReviews');

}

//edit ta review controller function

async function renderEditTAReview(req, res){
    var result = findTAbyID(req.params.id);
    res.render('editReviewTA.ejs', {
        result:result
    });
}

async function httpEditTAReview(req, res, next){
    console.log(req.body);
    var result = await editTAReview(req);

    if(!result.success)
    {
        return res.status(500).json({
            error:"Internal Server Error"
        });
    }
    console.log(result);
    res.redirect('/myReviewsTA')
}

//edit ta controller function
async function renderEditTAPage(req, res){
    var result = await findTAbyID(req.params.id);

    result = result.data.rows;
    result[0].TYPE = result[0].TYPE.trim();

    console.log(result);

    res.render('editTA.ejs', {
        result:result
    });
}

async function httpEditTA(req, res, next){
    var result = await editTA(req);
    if(!result.success)
    {
        return res.status(500).json({
            error:"Internal Server Error"
        });
    }
    console.log(result);
    
}

async function httpAddTAImages(req, res, next){
    console.log(req.files);


    if (!req.files)
        return res.redirect('/index');

    for (const file of req.files) {
        const result = await InsertTAImages(req.params.id, '/images/tapics/' + file.filename);

        if (!result.success)
            return res.status(500).json({
                error: "Internal Server Error"
            });
    }

    next();
}
module.exports = {
    httpEditReview,
    httpEditTA,
    httpEditTAReview,
    renderEditTAPage,
    renderEditReview,
    renderEditTAReview,
    httpAddTAImages
}