import{
    httpLogIn,
    GoToPage,
} from "./requests.js"

import{
    setCookie,
    getCookie,
} from "./cookies.js"

const API_URL = 'http://localhost:8000';


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

        document.location.href = '/index'

        // const res = await GoToPage('index');
        // const text = await res.text();
        // console.log(text); 

        // console.log(document.getElementsByTagName('html')[0]);
        // document.getElementsByTagName('html')[0].innerHTML(text);


        // const formData = new FormData();

        // try {
        //     return await fetch(`${API_URL}/index`, {
        //       method: "post",
        //       headers: {
                
        //       },
        //       body: formData,
        //     });
        //   } catch(err) {
        //     return {
        //       ok: false,
        //     };
        //   }

        
       

    }
    else if( response.status === 401 ){
        //alert("LogIn Failed");
    }
    
});


// const signupLink = document.getElementById("signup");

// signupLink.setAttribute('pointer-events','none');
// signupLink.setAttribute('cursor','default');

// signupLink.addEventListener('click',async()=>{
//     try {
//         return await fetch(`${API_URL}/signup`, {
//           method: "get",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//       } catch(err) {
//         // console.log(err);
//         return {
//           ok: false,
//           };
//         }
// })