

import * as ActionTypes from "../ActionTypes";

export const EmpCars = (
  state = {
    isLoading: true,
    errMess: null,
    empCars: [],
    addErrMess: null,
    isAdded: false,
    empCarUpdate:null
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.EMPCARS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        empCars: [],
      };
    case ActionTypes.EMPCARS_FALIED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        empCars: [],
      };
    case ActionTypes.ADD_EMPCARS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        empCars: action.payload,
      };
    case ActionTypes.EMPCAR_ADD_FAILED:
      return {
        ...state,
        addErrMess: action.payload,
        isAdded: false,
      };
    case ActionTypes.EMPCAR_IS_ADDED:
      return {
        ...state,
        addErrMess: null,
        isAdded: true,
      };
  
    default:
      return state;
  }
};
