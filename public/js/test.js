import{
    httpSubmitUser
} from "./requests.js"


const form  = document.getElementById('signupForm');
const submitBtn  = document.getElementById('submitBtn');


// form.addEventListener('submit', (event) => {
//     // handle the form data
//     //event.preventDefault();
//     const firstName = form.elements['firstName'];
//     console.log(firstName);
// });

submitBtn.addEventListener('click',async()=>{

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const phoneNo = document.getElementById("phone").value;
    const dob = document.getElementById("dob").value;

    const response = await httpSubmitUser({
        firstName,
        lastName,
        email,
        password,
        phoneNo,
        dob
    });

    console.log(response);


    // console.log({
    //     firstName,
    //     lastName,
    //     email,
    //     password,
    //     phoneNo,
    //     dob
    // })
    
});