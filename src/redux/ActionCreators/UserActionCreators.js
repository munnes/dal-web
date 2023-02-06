
import * as ActionTypes from "../ActionTypes";
import { baseUrl } from "../../shared/baseUrl";

export const requestLogin = (creds) => {
  return {
    type: ActionTypes.LOGIN_REQUEST,
    creds,
  };
};

export const receiveLogin = (token) => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    token: token,
  };
};

export const loginError = (message) => {
  return {
    type: ActionTypes.LOGIN_FAILURE,
    message,
  };
};

export const loginUser = (creds) => (dispatch) => {
  // We dispatch requestLogin to kickoff the call to the API
  dispatch(requestLogin(creds));
  return fetch(baseUrl + "users/login", {
    mode: "cors",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(creds),
  })
    .then(
      (response) => {
        // console.log("test " + response);
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      if (response.success) {
        // If login was successful, set the token in local storage
        localStorage.setItem("token", response.token);
        localStorage.setItem("creds", JSON.stringify(creds));
        localStorage.setItem("isReset", response.isReset);
        localStorage.setItem("userID", response.userID);
        localStorage.setItem("username", response.username);
        dispatch(receiveLogin(response.token));
      } else {
        var error = new Error("Error " + response.status);
        error.response = response;
        throw error;
      }
    })
    .catch((error) => dispatch(loginError(error.message)));
};

///********Logout********** */
export const requestLogout = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST,
  };
};

export const receiveLogout = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS,
  };
};

// Logs the user out
export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout());
  localStorage.removeItem("token");
  localStorage.removeItem("creds");

  dispatch(receiveLogout());
};

//****POST */
export const signupUser = (user) => (dispatch) => {
  return fetch(baseUrl + "users/signup", {
    method: "POST",
    body: JSON.stringify({
      ...user,
      username: user.username.toLowerCase(),
    }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((users) => {
      console.log("User Added", users);
      dispatch(userAdded(users));
    
    })
    .catch((error) => dispatch(signupFailed(error.message)));
};
export const userAdded = (users) => ({
  type: ActionTypes.SIGNUP_SUCCESS,
  payload: users,
});
export const signupFailed = (addErrmess) => ({
  type: ActionTypes.SIGNUP_FAILED,
  payload: addErrmess,
});

//*********************Reset Password */

export const resetUser = (user) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch(baseUrl + "users/", {
    mode: "cors",
    method: "PUT",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((user) => {
      console.log("User Reset", user);

      dispatch(passReset(true));
      localStorage.setItem("isReset", true);
    })
    .catch((error) => dispatch(usersFailed(error.message)));
};

//********* */
export const passReset = (isReset) => ({
  type: ActionTypes.RESET_USER,
  payload: isReset,
});




export const usersFailed = (errmess) => ({
  type: ActionTypes.USERS_FALIED,
  payload: errmess,
});



//************ */
/*************************GET */
export const fetchUsers = () => (dispatch) => {
    // const bearer = "Bearer " + localStorage.getItem("token");
    dispatch(usersLoading(true));
    return fetch(baseUrl + "users", {
      headers: {
        "Content-Type": "application/json",
        //  Authorization: bearer,
      },
      credentials: "same-origin",
    })
      .then(
        (response) => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            error.response = response;
            throw error;
          }
        },
        //if server not response no hear any thing from server
        (error) => {
          var errmess = new Error(error.message);
          throw errmess;
        }
      )
      .then((response) => response.json())
      .then((users) => dispatch(addUsers(users)))
      .catch((error) => dispatch(usersFailed(error.message)));
  };

  
  export const addUsers = (users) => ({
    type: ActionTypes.ADD_USERS,
    payload: users,
  });

  export const usersLoading = () => ({
    type: ActionTypes.USERS_LOADING,
  });