
import * as ActionTypes from "../ActionTypes";

export const Auth = (
  state = {
    isLoading: false,
    isAuthenticated: localStorage.getItem("token") ? true : false,
    token: localStorage.getItem("token"),
    user: localStorage.getItem("creds")
      ? JSON.parse(localStorage.getItem("creds"))
      : null,
    errMess: null,
    addErrMess: null,
    isAdded: null,
    isReset: localStorage.getItem("isReset") === "true" ? true : false,
   
    userID: +localStorage.getItem("userID"),
    username: localStorage.getItem("username"),
   
    isUpdated: null,
   
  },
  action
) => {
  switch (action.type) {
   
    case ActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
        user: action.creds,
        userUpdate: null,
        signed: false,
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        errMess: "",
        token: action.token,

        isReset: localStorage.getItem("isReset") === "true" ? true : false,
       
        userID: +localStorage.getItem("userID"),
        username: localStorage.getItem("username"),
       
        userUpdate: null,
        signed: false,
      };
    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        errMess: action.message,
        userUpdate: null,
        signed: false,
      };
    case ActionTypes.LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: true,

        userUpdate: null,
        signed: false,
      };
    case ActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        token: "",
        user: null,
        isReset: null,
       
        userUpdate: null,
        userID: null,
       
        signed: false,
      };
    case ActionTypes.SIGNUP_FAILED:
      return {
        ...state,
        addErrMess: action.payload,
        isAdded: false,
        userUpdate: null,
        signed: false,
        //   cityUpdate: null,
      };

    case ActionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        addErrMess: null,
        isAdded: true,
        userUpdate: null,
        signed: true,
        newUser: action.payload,
      };


    case ActionTypes.USERS_FALIED:
      return {
        ...state,
     
        errMess: action.payload,
       
        userUpdate: null,
        signed: false,
      
      };
    case ActionTypes.RESET_USER:
      return {
        ...state,
        isReset: action.payload,
        userUpdate: null,
        signed: false,
      };
      case ActionTypes.ADD_USERS:
        return {
          ...state,
          isLoading: false,
          errMess: null,
          users: action.payload,
          userUpdate: null,
          signed: false,
          //areaUpdate: null,
          //    addErrMess: null,
        };
     
    default:
      return state;
  }
};
