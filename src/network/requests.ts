import axios from "axios";
import CONFIG from "../../configuration";

export const url = CONFIG.restURL;

const api = axios.create({
  baseURL: "https://api.seventhave.io",
});
export default api;

export const signupRequest = async (formData: any) => {
  var config = {
    method: "post",
    url: `${url}/register`,
    headers: {
      "Content-Type": "application/json",
    },

    data: { ...formData, version: CONFIG.version },
  };
  console.warn('SIGNUP_REQUEST',formData)
  try {
    const request = await axios(config);
    if (request.data) {
      return { success: request.data };
    }
  } catch (error) {
    console.warn(
      "ERROR IN SIGNUP",
      JSON.stringify(error.response.data.keyPattern)
    );
    if (error.response) {
      if (error.response.data.keyPattern.username) {
        return {
          error: {
            title: "Sorry 🥺",
            message: "Username is already taken, please choose another",
          },
        };
      } else if (error.response.data.keyPattern.email) {
        return {
          error: {
            title: "Sorry 🥺",
            message: "Email is already in use, please choose another",
          },
        };
      } else if (error.response.data.keyPattern.phoneNumber) {
        return {
          error: {
            title: "Sorry 🥺",
            message: "Phone number is already in use, please choose another",
          },
        };
      } else {
        return {
          error: {
            title: "Sorry 🥺",
            message: "We are not sure what went wrong",
          },
        };
      }
    } else if (error.request) {
      return {
        error: {
          title: "Sorry 🥺",
          message: "Your request did not reach our servers",
        },
      };
    } else {
      return {
        error: {
          title: "Sorry 🥺",
          message: "Something went wrong",
        },
      };
    }
  }
};

export const loginRequest = async (username: string, password: string) => {
  let data = JSON.stringify({
    username: username.toLowerCase(),
    password: password,
    version: CONFIG.version,
  });

  let config = {
    method: "post",
    url: `${url}/login`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const request = await axios(config);
    return { success: request.data };
  } catch (error) {
    if (error.response.status === 502) {
      return {
        error: {
          title: "Oops!!",
          message: "User does not exist",
        },
      };
    } else if (error.response.status === 500) {
      return {
        error: {
          title: "Oops!!",
          message: "Incorrect password",
        },
      };
    }
  }
};

export const updateProfileRequest = async (
  formData: any,
  token: string,
  username: string
) => {
  var data = JSON.stringify(formData);

  var config = {
    method: "put",
    url: `${url}/users/update/${username}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const request = await axios(config);
    return { success: request.data };
  } catch (error) {
    return { error: error };
  }
};

/**
 *
 * Checks if the token in local storage is valid and returns the user's data upon success
 *
 */
export const tokenIsValid = async (username: string, token: string) => {
  var config = {
    method: "post",
    url: `${url}/users/verify`,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      username: username,
      token: token,
      version: CONFIG.version,
    },
  };
  try {
    const request = await axios(config);
    return { success: request.data };
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};

export const searchUser = async (username: string) => {
  var config = {
    method: "get",
    url: `${url}/users/read/${username}`,
    headers: {},
  };
  try {
    const request = await axios(config);
    if (request.data === null) {
      return { error: "Something went wrong, please try again" };
    } else {
      return { success: request.data };
    }
  } catch (error) {
    return { error: error };
  }
};

export const sendConnectionRequest = async (props: any) => {
  var data = JSON.stringify({
    token: props.token,
    username: props.username,
    receiver: props.reciever,
  });

  var config = {
    method: "post",
    url: `${url}/users/requestConnection`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  try {
    const request = await axios(config);
    console.warn(request);

    if (request.data === null) {
      return { error: "Something went wrong, please try again" };
    } else {
      return { success: request.data };
    }
  } catch (error) {
    return { error: error };
  }
};
export const getRequestedConnections = async (username: string) => {
  var config = {
    method: "get",
    url: `${url}/users/retrieve/${username}/requestedConnections,pendingConnections`,
    headers: {},
  };
  try {
    const request = await axios(config);
    if (request.data === null) {
      return { error: "Something went wrong, please try again" };
    } else {
      return { success: request.data };
    }
  } catch (error) {
    return { error: error };
  }
};
export const acceptConnectionRequest = async (props: any) => {
  var data = JSON.stringify({
    token: props.token,
    username: props.username,
    waiter: props.waiter,
  });

  var config = {
    method: "post",
    url: `${url}/users/acceptConnection`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const request = await axios(config);

    if (request.data === null) {
      return { error: "Something went wrong, please try again" };
    } else {
      return { success: request.data };
    }
  } catch (error) {
    return { error: error };
  }
};
