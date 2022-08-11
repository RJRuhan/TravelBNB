// import{
//     setCookie,
//     getCookie,
// } from "./cookies.js"

// import{
//     httpAuthenticateUser,
//     httpGetUserByEmail,
//     httpGetUserPhoto,
//     httpSearchProperty
// } from "./requests.js"

// let user ;
// let profilePicPath;

// document.addEventListener("DOMContentLoaded", async()=> {
//     console.log(getCookie("accessToken"));

//     let result = await httpAuthenticateUser(getCookie("accessToken"));

//     result = await result.json();

//     console.log(result);

//     result = await httpGetUserByEmail(result.email);

//     user = await result.json();
//     user = user[0];

//     console.log(user.USERID);

//     result = await httpGetUserPhoto(user.USERID);

//     result = await result.json();

//     console.log(result);

//     if( result.error ){
//         return;
//     }

//     profilePicPath = result[0].PROFILEIMG;

//     const img = document.getElementById("profile-img");

//     img.setAttribute("src","./images/usersProfilePic/" + profilePicPath);
// });


// const form = document.getElementById('searchPropertyForm');

// form.addEventListener('submit',async(e)=>{

//     // e.preventDefault();

//     // const dest = document.getElementById("destination").value;
//     // const checkIn = document.getElementById("checkIn").value;
//     // const checkOut = document.getElementById("checkOut").value;

//     // console.log(checkIn);


//     // let result = await httpSearchProperty({
//     //     dest,
//     //     checkIn,
//     //     checkOut,
//     // });

//     // result = await result.json();

//     // console.log(result);
    
// });