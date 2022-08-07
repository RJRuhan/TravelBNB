const API_URL = 'http://localhost:8000';

async function httpLogIn(user){
  try {
    return await fetch(`${API_URL}/users/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  } catch(err) {
    return {
      ok: false,
    };
  }
}

async function httpGetUsers() {
    const response = await fetch(`${API_URL}/users`);
    return await response.json();
  }
  
  // Load launches, sort by flight number, and return as JSON.
  async function httpGetLaunches() {
    const response = await fetch(`${API_URL}/launches`);
    const fetchedLaunches = await response.json();
    return fetchedLaunches.sort((a, b) => {
      return a.flightNumber - b.flightNumber;
    });
  }
  
  // Submit given launch data to launch system.
  async function httpSubmitUser(user) {
    try {
      return await fetch(`${API_URL}/users/add`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
    } catch(err) {
      return {
        ok: false,
      };
    }
  }

  async function httpSendFiles(formData){
    try {
      return await fetch(`${API_URL}/users/imgUpload`, {
        method: "post",
        headers: {
          
        },
        body: formData,
      });
    } catch(err) {
      return {
        ok: false,
      };
    }
  }
  
  // Delete launch with given ID.
  // async function httpAbortLaunch(id) {
  //   try {
  //     return await fetch(`${API_URL}/launches/${id}`, {
  //       method: "delete",
  //     });
  //   } catch(err) {
  //     console.log(err);
  //     return {
  //       ok: false,
  //     };
  //   }
  // }


  
export{
    httpGetUsers,
    httpSubmitUser,
    httpLogIn,
    httpSendFiles,
    API_URL,
};