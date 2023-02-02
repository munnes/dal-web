

import * as ActionTypes from "../ActionTypes";

export const Employees = (
  state = {
    isLoading: true,
    errMess: null,
    employees: [],
    addErrMess: null,
    isAdded: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.EMPLOYEES_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        employees: [],
      };
    case ActionTypes.EMPLOYEES_FALIED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        employees: [],
      };
    case ActionTypes.ADD_EMPLOYEES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        employees: action.payload,
      };
    case ActionTypes.EMPLOYEE_ADD_FAILED:
      return {
        ...state,
        addErrMess: action.payload,
        isAdded: false,
      };
    case ActionTypes.EMPLOYEE_IS_ADDED:
      return {
        ...state,
        addErrMess: null,
        isAdded: true,
      };
  
    default:
      return state;
  }
};
