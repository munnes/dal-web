

import * as ActionTypes from "../ActionTypes";

export const Categories = (
  state = {
    isLoading: true,
    errMess: null,
    categories: [],
    addErrMess: null,
    isAdded: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.CATEGORIES_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        categories: [],
      };
    case ActionTypes.CATEGORIES_FALIED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        categories: [],
      };
    case ActionTypes.ADD_CATEGORIES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        categories: action.payload,
      };
    case ActionTypes.CATEGORY_ADD_FAILED:
      return {
        ...state,
        addErrMess: action.payload,
        isAdded: false,
      };
    case ActionTypes.CATEGORY_IS_ADDED:
      return {
        ...state,
        addErrMess: null,
        isAdded: true,
      };
  
    default:
      return state;
  }
};
