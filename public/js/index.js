import{
    httpGetUsers,
    httpLogIn,
    API_URL
} from "./requests.js"

const loginBtn  = document.getElementById('loginBtn');


loginBtn.addEventListener('click',async()=>{

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await httpLogIn({
        email,
        password,
    });

    console.log(response);

    if( response.status === 200 ){
        // const data = await response.json();
        
        // const res = await setUser(data['0']);
        // console.log(user);

        //window.location.replace("home.html");
    }
    else if( response.status === 401 ){
        //alert("LogIn Failed");
    }
    
});