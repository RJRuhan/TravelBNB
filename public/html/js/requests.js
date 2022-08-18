const API_URL = 'http://localhost:8000';

async function GoToPage(route){
  try {
    return await fetch(`${API_URL}/` + route, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch(err) {
    return {
      ok: false,
    };
  }
}

async function httpLogIn(user){
  try {
    return await fetch(`${API_URL}/auth/login`, {
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

async function httpGetUserByEmail(email) {
  try {
    return await fetch(`${API_URL}/users/getByEmail/` + email, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch(err) {
    // console.log(err);
    return {
      ok: false,
      };
    }
  }

  async function httpGetUserPhoto(userId) {
    try {
      return await fetch(`${API_URL}/users/photo/` + userId, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch(err) {
      // console.log(err);
      return {
        ok: false,
        };
      }
    }


  
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

  async function httpAuthenticateUser(accessToken){

    try{
      return await fetch(`${API_URL}/auth/authenticate`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization:"Bearer " + accessToken,
        },
      });
    }catch(err){
      return {
        ok : false,
      };
    }
  }

  async function httpSearchProperty(data) {
    try {
      return await fetch(`${API_URL}/property/search`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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
    httpAuthenticateUser,
    httpGetUserByEmail,
    httpGetUserPhoto,
    httpSearchProperty,
    GoToPage,
};