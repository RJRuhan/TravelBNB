var user ;
var loggedIn = false;

function setUser(data){
    return new Promise((resolve,reject)=>{
        user = data;
        loggedIn = true;
        resolve('success');
    })
    
}

export{
    user,
    setUser,
    loggedIn,
}