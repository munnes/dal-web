

import * as ActionTypes from "../ActionTypes";

export const Quotas = (
  state = {
    isLoading: true,
    errMess: null,
    quotas: [],
    addErrMess: null,
    isAdded: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.QUOTAS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        quotas: [],
      };
    case ActionTypes.QUOTAS_FALIED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        quotas: [],
      };
    case ActionTypes.ADD_QUOTAS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        quotas: action.payload,
      };
    case ActionTypes.QUOTA_ADD_FAILED:
      return {
        ...state,
        addErrMess: action.payload,
        isAdded: false,
      };
    case ActionTypes.QUOTA_IS_ADDED:
      return {
        ...state,
        addErrMess: null,
        isAdded: true,
      };
  
    default:
      return state;
  }
};
