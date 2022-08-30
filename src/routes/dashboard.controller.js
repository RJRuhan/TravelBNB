const{
    findPropertyDetails,
findIfHost,
findEarningMonth,
findEarningTotal,
findSpentMonth,
findSpentTotal,
findTotalGuest,
findTotalReserve,
findTotalCancel
} = require('../../models/dashboard.oracle');

async function renderDashboard(req, res){
    var result1=await findEarningMonth(req);
    var result2=await findEarningTotal(req);
    var result3=await findSpentMonth(req);
    var result4=await findSpentTotal(req);
    var result5=await findTotalGuest(req);
    var result6=await findTotalReserve(req);
    var result7=await findTotalCancel(req);
    var result8=await findPropertyDetails(req);
    var host=await findIfHost(req);

    res.render('dashboard.ejs', {
        host:host,
        result1:result1,
        result2:result2,
        result3:result3,
        result4:result4,
        result5:result5,
        result6:result6,
        result7:result7,
        result8:result8
    })
}

module.exports={renderDashboard};