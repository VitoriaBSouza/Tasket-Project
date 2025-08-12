const url = import.meta.env.VITE_BACKEND_URL;

const userServices = {};

// fetchWithAuth reutilizable con manejo de token y redirección
const fetchWithAuth = async (endpoint, options = {}) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) headers["Authorization"] = "Bearer " + token;

  const resp = await fetch(url + endpoint, { ...options, headers });

  if (resp.status === 401 || resp.status === 422) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    window.location.href = "/";
    return null;
  }

  return resp;
};

// POST sign up
userServices.signup = async (formData) => {
  try {
    const resp = await fetch(url + "/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await resp.json();

    if (!resp.ok) {
      return { error: data.error || "Sign Up failed" };
    }

    return data;
  } catch (error) {
    return error;
  }
};

// POST login
userServices.login = async (formData) => {
  try {
    const resp = await fetch(url + "/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await resp.json();

    if (!resp.ok) {
      return { error: data.error || "Login failed" };
    }

    if (formData.rememberMe) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    } else {
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user", JSON.stringify(data.user));
    }

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// GET user info
userServices.getUser = async () => {
  try {
    const resp = await fetchWithAuth("/api/user", { method: "GET" });
    if (!resp) return;

    const data = await resp.json();

    if (!resp.ok) {
      return { error: data.error || "Could not fetch user" };
    }

    localStorage.setItem("user", JSON.stringify(data.user));

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// PUT edit user info
userServices.editUser = async (formData) => {
  try {
    const resp = await fetchWithAuth("/api/user", {
      method: "PUT",
      body: JSON.stringify(formData),
    });

    if (!resp) {
      return { error: "No response from server" };
    }

    const data = await resp.json();

    if (!resp.ok) {
      return { error: data.error || "Profile not updated" };
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    localStorage.setItem("user", JSON.stringify(data.user));

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// POST forgot password
userServices.forgotPassword = async (email) => {
  try {
    const resp = await fetch(url + "/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await resp.json();

    if (!resp.ok) {
      return { error: data.error || "Could not reset password" };
    }

    return data;
  } catch (error) {
    console.error("Forgot Password Error:", error.message);
    return { error: error.message };
  }
};

// POST reset password
userServices.resetPassword = async (token, new_password) => {
  try {
    const resp = await fetch(url + "/api/reset-password/" + token, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: new_password }),
    });

    const data = await resp.json();

    if (!resp.ok) {
      return { error: data.error || "Password reset failed" };
    }

    console.log("Reset Password:", data);
    return data;
  } catch (error) {
    console.error("Reset Password Error:", error.message);
    return { error: error.message };
  }
};

// DELETE user
userServices.deleteUser = async () => {
  try {
    const resp = await fetchWithAuth("/api/user", { method: "DELETE" });
    if (!resp) return;

    const data = await resp.json();

    if (!resp.ok) {
      return { error: data.error || "Could not delete user account" };
    }

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default userServices;
