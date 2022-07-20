import{
    httpGetUsers,
    API_URL
} from "./requests.js"

const loginBtn  = document.getElementById('loginBtn');


// form.addEventListener('submit', (event) => {
//     // handle the form data
//     //event.preventDefault();
//     const firstName = form.elements['firstName'];
//     console.log(firstName);
// });

loginBtn.addEventListener('click',async()=>{
    const response = await httpGetUsers();
    console.log(response);

});