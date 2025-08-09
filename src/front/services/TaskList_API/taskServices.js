const url = import.meta.env.VITE_BACKEND_URL;

const taskServices = {};

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

// GET all tasks of a list
taskServices.getAllTasks = async (list_id) => {
  try {
    const resp = await fetchWithAuth("/api/user/list/" + list_id + "/tasks", {
      method: "GET",
    });
    if (!resp) return;

    const data = await resp.json();

    if (!resp.ok) {
      return { error: data.error || "Could not fetch tasks" };
    }

    return data;
  } catch (error) {
    console.log(error);
    return { error: "Network error" };
  }
};

// GET one task of a list
taskServices.getOneTask = async (list_id, task_id) => {
  try {
    const resp = await fetchWithAuth(
      "/api/user/list/" + list_id + "/task/" + task_id,
      { method: "GET" }
    );
    if (!resp) return;

    const data = await resp.json();

    if (!resp.ok) {
      return { error: data.error || "Could not fetch task" };
    }

    return data;
  } catch (error) {
    console.log(error);
    return { error: "Network error" };
  }
};

taskServices.getTaskStatus = async () => {
  try {
    const resp = await fetchWithAuth("/api/user/tasks/status", {
      method: "GET",
    });
    if (!resp) return;

    const data = await resp.json();

    if (!resp.ok) {
      return { error: data.error || "Could not fetch task status stats" };
    }

    return data;
  } catch (error) {
    console.log(error);
    return { error: "Network error" };
  }
};

taskServices.getTaskStatusByList = async (list_id) => {
  try {
    const resp = await fetchWithAuth(
      "/api/user/list/" + list_id + "/tasks/status",
      { method: "GET" }
    );
    if (!resp) return;

    const data = await resp.json();

    if (!resp.ok) {
      return { error: data.error || "Could not fetch task status for list" };
    }

    return data;
  } catch (error) {
    console.log(error);
    return { error: "Network error" };
  }
};

// GET lists with urgent tasks for the logged user
taskServices.getUrgentLists = async () => {
  try {
    const resp = await fetchWithAuth("/api/user/lists/tasks/urgent", {
      method: "GET",
    });
    if (!resp) return;

    const data = await resp.json();

    if (!resp.ok) {
      return { error: data.error || "Could not fetch urgent lists" };
    }

    return data;
  } catch (error) {
    console.log(error);
    return { error: "Network error" };
  }
};

// POST a new task
taskServices.addTask = async (list_id, taskData) => {
  try {
    const resp = await fetchWithAuth("/api/user/list/" + list_id + "/task", {
      method: "POST",
      body: JSON.stringify(taskData),
    });
    if (!resp) return;

    const data = await resp.json();

    if (!resp.ok) {
      return { error: data.error || "Could not create task" };
    }

    return data;
  } catch (error) {
    console.log(error);
    return { error: "Network error" };
  }
};

// PUT to update task details
taskServices.updateTask = async (list_id, task_id, taskData) => {
  try {
    const resp = await fetchWithAuth(
      "/api/user/list/" + list_id + "/task/" + task_id,
      {
        method: "PUT",
        body: JSON.stringify(taskData),
      }
    );
    if (!resp) return;

    const data = await resp.json();

    if (!resp.ok) {
      return { error: data.error || "Could not update task" };
    }

    return data;
  } catch (error) {
    console.log(error);
    return { error: "Network error" };
  }
};

// PUT to update task urgency
taskServices.updateUrgency = async (list_id, task_id, urgent) => {
  try {
    const resp = await fetchWithAuth(
      "/api/user/list/" + list_id + "/task/" + task_id + "/urgent",
      {
        method: "PUT",
        body: JSON.stringify({ urgent }),
      }
    );
    if (!resp) return;

    const data = await resp.json();

    if (!resp.ok) {
      return { error: data.error || "Could not update urgency" };
    }

    return data;
  } catch (error) {
    console.log(error);
    return { error: "Network error" };
  }
};

// PUT to update task status
taskServices.updateStatus = async (list_id, task_id, status) => {
  try {
    const resp = await fetchWithAuth(
      "/api/user/list/" + list_id + "/task/" + task_id + "/status",
      {
        method: "PUT",
        body: JSON.stringify({ status }),
      }
    );
    if (!resp) return;

    const data = await resp.json();

    if (!resp.ok) {
      return { error: data.error || "Could not update status" };
    }

    return data;
  } catch (error) {
    console.log(error);
    return { error: "Network error" };
  }
};

// DELETE one task
taskServices.deleteOneTask = async (list_id, task_id) => {
  try {
    const resp = await fetchWithAuth(
      "/api/user/list/" + list_id + "/task/" + task_id,
      { method: "DELETE" }
    );
    if (!resp) return;

    const data = await resp.json();

    if (!resp.ok) {
      return { error: data.error || "Could not delete task" };
    }

    return data;
  } catch (error) {
    console.log(error);
    return { error: "Network error" };
  }
};

// DELETE all tasks of a list
taskServices.deleteAllTasks = async (list_id) => {
  try {
    const resp = await fetchWithAuth("/api/user/list/" + list_id + "/tasks", {
      method: "DELETE",
    });
    if (!resp) return;

    const data = await resp.json();

    if (!resp.ok) {
      return { error: data.error || "Could not delete all tasks" };
    }

    return data;
  } catch (error) {
    console.log(error);
    return { error: "Network error" };
  }
};

export default taskServices;
