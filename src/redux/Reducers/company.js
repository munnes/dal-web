

import * as ActionTypes from "../ActionTypes";

export const Companies = (
  state = {
    isLoading: true,
    errMess: null,
    companies: [],
    addErrMess: null,
    isAdded: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.COMPANIES_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        companies: [],
      };
    case ActionTypes.COMPANIES_FALIED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        companies: [],
      };
    case ActionTypes.ADD_COMPANIES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        companies: action.payload,
      };
    case ActionTypes.COMPANY_ADD_FAILED:
      return {
        ...state,
        addErrMess: action.payload,
        isAdded: false,
      };
    case ActionTypes.COMPANY_IS_ADDED:
      return {
        ...state,
        addErrMess: null,
        isAdded: true,
      };
  
    default:
      return state;
  }
};
