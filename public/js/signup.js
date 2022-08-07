import{
    httpSubmitUser,
    httpSendFiles,
} from "./requests.js"

const form = document.getElementById("signupForm");

form.addEventListener("submit", submitForm);

async function submitForm(e) {
    
    console.log('here');
    e.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const phoneNo = document.getElementById("phone").value;
    const dob = document.getElementById("dob").value;
    const files = document.getElementById("uploadImg");

    const response = await httpSubmitUser({
            firstName,
            lastName,
            email,
            password,
            phoneNo,
            dob
        });
    
    console.log(response);
    
    if( files.files.length === 0  ){
        console.log('No files selected');
        return;
    }

    const formData = new FormData();

    formData.append('email',email);
    formData.append('image',files.files[0]);

    const res = await httpSendFiles(formData);

    console.log(res);

}

// const submitBtn  = document.getElementById('submitBtn');


// submitBtn.addEventListener('click',async()=>{

//     const firstName = document.getElementById("firstName").value;
//     const lastName = document.getElementById("lastName").value;
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;
//     const phoneNo = document.getElementById("phone").value;
//     const dob = document.getElementById("dob").value;
//     const imgURL = document.getElementById("addPhoto");


    // const response = await httpSubmitUser({
    //     firstName,
    //     lastName,
    //     email,
    //     password,
    //     phoneNo,
    //     dob
    // });

//     // console.log(response);
//     console.log(imgURL);
//     console.log(imgURL.files);

// });