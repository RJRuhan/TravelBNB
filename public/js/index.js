import{
    httpLogIn,
} from "./requests.js"

import{
    setCookie,
    getCookie,
} from "./cookies.js"

const form  = document.getElementById('loginForm');


form.addEventListener('submit',async(e)=>{

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await httpLogIn({
        email,
        password,
    });

    // console.log(getCookie("accessToken"));
    // console.log(getCookie("refreshToken"));


    if( response.status === 200 ){
        const tokens = await response.json();

        setCookie("accessToken",tokens.accessToken,15);
        setCookie("refreshToken",tokens.refreshToken,15);

        window.location.replace("home.html");
    }
    else if( response.status === 401 ){
        //alert("LogIn Failed");
    }
    
});