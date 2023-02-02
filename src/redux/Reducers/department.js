

import * as ActionTypes from "../ActionTypes";

export const Departments = (
  state = {
    isLoading: true,
    errMess: null,
    departments: [],
    addErrMess: null,
    isAdded: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.DEPARTMENTS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        departments: [],
      };
    case ActionTypes.DEPARTMENTS_FALIED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        departments: [],
      };
    case ActionTypes.ADD_DEPARTMENTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        departments: action.payload,
      };
    case ActionTypes.DEPARTMENT_ADD_FAILED:
      return {
        ...state,
        addErrMess: action.payload,
        isAdded: false,
      };
    case ActionTypes.DEPARTMENT_IS_ADDED:
      return {
        ...state,
        addErrMess: null,
        isAdded: true,
      };
  
    default:
      return state;
  }
};
