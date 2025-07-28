// This will set the url to the same we added to the env file
const url = import.meta.env.VITE_BACKEND_URL;

const userServices = {};

// Utility: Add JWT token
const authHeaders = () => ({
  'Authorization': 'Bearer ' + localStorage.getItem('token'),
  'Content-Type': 'application/json'
});

//POST method to call sign up
userServices.signup = async (formData) => {
  try {
    const resp = await fetch(url + "/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //Need to add email, password and username fields all required.
      //All other fields are filled automatically.
      body: JSON.stringify(formData),
    });

    const data = await resp.json();

    if (!resp.ok){
      return {error: data.error || "Sign Up failed" };
    }

    return data;

  } catch (error) {
    return error;
  }
};

//POST method to call log in
userServices.login = async (formData, rememberMe) => {
  try {
    const resp = await fetch(url + "/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //Need only the email and password fields. All the others are filled automatically.
      body: JSON.stringify(formData),
    });
    const data = await resp.json();

    if (!resp.ok){
      return {error: data.error || "Login failed" };
    }

    //If rememberMe is true, we store the token and user data in localStorage for 7 days
    //If false, we store them in sessionStorage for the current session
    if (rememberMe) {
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
    } else {
      sessionStorage.setItem("token", data.token)
      sessionStorage.setItem("user", JSON.stringify(data.user))
    }

    return data;

  } catch (error) {
    console.log(error);
    return error;
  }
};


//GET user information, could be profile page
userServices.getUser = async () => {
  try {
    const resp = await fetch(url + "/api/user", {
      method: "GET",
      //Token required, we have to log in first
      headers: authHeaders()
    })

    const data = await resp.json()

    if (!resp.ok){
      return {error: data.error || "Could not fetch user" };
    }
    console.log(data)

    //add user data as object, we need to use JSON.stringify()
    localStorage.setItem('user', JSON.stringify(data.user))
    
    return data;

  } catch (error) {
    console.log(error);
    return error;
  }
}

//PUT to edit user information
userServices.editUser = async (userData) => {
  try {
    const resp = await fetch(url + "/api/user", {
      method: "PUT",
      //Token required, we have to log in first
      headers: authHeaders(),
      //Same as the POST method
      body: JSON.stringify(userData)
    })

    const data = await resp.json()

    if (!resp.ok){
      return {error: data.error || "Profile not updated" };
    }

    //update user data locally as object, we need to use JSON.stringify()
    localStorage.setItem("token", data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    
    return data;

  } catch (error) {
    console.log(error);
    return error;
  }
}

//POST for forgot password link (will send provisional token to the client email)
userServices.forgotPassword = async (email) => {
  try {
    const resp = await fetch(url + "/api/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //email field is required
      body: JSON.stringify({email}),
    });

    const data = await resp.json();

    if (!resp.ok){
      return {error: data.error || "Could not reset password" };
    }

    return data;

  } catch (error) {
    console.error("Forgot Password Error:", error.message);
    return { error: error.message };
  }
};

//POST for reset password after receivin token from forgot password method
userServices.resetPassword = async (token, new_password) => {
  try {
    //token will be sent as part on the reset password URL, we will have to extract from it
    const resp = await fetch(url + "/api/reset-password/" + token, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //Field password is required
      body: JSON.stringify({ password: new_password }),
    });

    const data = await resp.json();

    if (!resp.ok){
      return {error: data.error || "Password reset failed" };
    }

    console.log("Reset Password:", data);
    return data;
    
  } catch (error) {
    console.error("Reset Password Error:", error.message);
    return { error: error.message };
  }
};

//Soft DELETE user information, we keep recipes posted by the user
userServices.deleteUser = async () => {
  try {
    const resp = await fetch(url + "/api/user", {
      method: "DELETE",
      //Token required, we have to log in first
      headers: authHeaders()
    })

    const data = await resp.json()

    if (!resp.ok){
      return {error: data.error || "Could not delete user account" };
    }
    
    console.log(data)

    //we remove the user and token from local storage in order to log them out
    //All data deleted from server none is kept in the database
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    return data;

  } catch (error) {
    console.log(error);
    return error;
  }
}

export default userServices;