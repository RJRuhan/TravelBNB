const {
    execute,
    executeMany,
    executeWithoutClosingConnection,
    newId,
} = require('./oracle.connect');

async function findPropertyDetails(data){
    const params = [data.USERID];
    const query = `SELECT P.PROPERTYID, P.PROPERTYNAME AS PROPERTYNAME, P.STREET AS STREET, L.CITY AS CITY, L.COUNTRY AS COUNTRY,
                    COUNT(T.TRANSACTIONID) AS RESERVE, SUM(T.AMOUNT) AS EARN, TO_CHAR(ADD_MONTHS( SYSDATE, -1 ), 'Month') AS MONTH
                    FROM PROPERTY P, LOCATION L, TRANSACTIONS T
                    WHERE P.PROPERTYID=T.PROPERTYID AND
                    P.LOCATIONID=L.LOCATIONID AND
                    P.HOSTID=:1
                    AND T.DATEOFTRANSACTION>=TRUNC( ADD_MONTHS( SYSDATE, -1 ), 'MM' )
                    GROUP BY P.PROPERTYID, PROPERTYNAME, STREET, CITY, COUNTRY;`;
    const options = {};
    const result=await execute(query,params, options);
    return result;
}

async function findIfHost(id){
    const params = [id];
    var host;
    const query = `SELECT * FROM HOST WHERE HOSTID = :1;`;
    const options = {};
    const result = await execute(query, params, options);

    if(result.data.rows.length!=0)
        host = true;
    else
        host = false;
    
    return host;
}

async function findEarningMonth(data){
    const params=[data.USERID];
    const query=`SELECT H.BANKACCOUNT AS BANKACCOUNT, SUM(T.AMOUNT) AS TOTALMONTH, TO_CHAR(ADD_MONTHS( SYSDATE, -1 ), 'Month') AS MONTH
                FROM HOST H, TRANSACTIONS T
                WHERE H.HOSTID=T.HOSTID
                AND H.HOSTID=:1
                AND T.DATEOFTRANSACTION>=TRUNC( ADD_MONTHS( SYSDATE, -1 ), 'MM' );`;
    const options ={};
    const result = await execute(query, params, options);
    return result;
}

async function findEarningTotal(data){
    const params=[data.USERID];
    const query=`SELECT SUM(T.AMOUNT) AS TOTAL
                FROM TRANSACTIONS T
                WHERE T.HOSTID=:1;`;
    const options ={};
    const result = await execute(query, params, options);
    return result;
}

async function findSpentMonth(data){
    const params=[data.USERID];
    const query=`SELECT G.CREDITCARD AS CREDITCARD, SUM(T.AMOUNT) TOTALSPENTMONTH, TO_CHAR(ADD_MONTHS( SYSDATE, -1 ), 'Month') AS MONTH
                FROM GUEST G, TRANSACTIONS T
                WHERE G.GUESTID=T.GUESTID
                AND G.GUESTID=:1
                AND T.DATEOFTRANSACTION>=TRUNC( ADD_MONTHS( SYSDATE, -1 ), 'MM' );`
    const options ={};
    const result = await execute(query, params, options);
    return result;
}

async function findSpentTotal(data){
    const params=[data.USERID];
    const query=`SELECT SUM(T.AMOUNT) AS TOTALSPENT
                FROM TRANSACTIONS T
                WHERE T.GUESTID=:1;`;
    const options ={};
    const result = await execute(query, params, options);
    return result;
}

async function findTotalGuest(data){
    const params=[data.USERID];
    const query = `SELECT SUM(GUESTNUM) AS GUESTS
                FROM RESERVATION
                WHERE HOSTID=:1;`;
    const options ={};
    const result = await execute(query, params, options);
    return result;
}

async function findTotalReserve(data){
    const params=[data.USERID];
    const query = `SELECT COUNT(TRANSACTIONID) AS RESERVE
                FROM TRANSACTIONS
                WHERE HOSTID=:1;
                AND UPPER(TYPE)='RESERVE';`;
    const options ={};
    const result = await execute(query, params, options);
    return result;
}

async function findTotalCancel(data){
    const params=[data.USERID];
    const query = `SELECT COUNT(TRANSACTIONID) AS CANCEL
                FROM TRANSACTIONS
                WHERE HOSTID=:1;
                AND UPPER(TYPE)='CANCEL';`;
    const options ={};
    const result = await execute(query, params, options);
    return result;
}

module.exports={
    findPropertyDetails,
findIfHost,
findEarningMonth,
findEarningTotal,
findSpentMonth,
findSpentTotal,
findTotalGuest,
findTotalReserve,
findTotalCancel
}