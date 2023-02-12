


import * as ActionTypes from "../ActionTypes";

export const ViewDones = (
  state = {
    isLoading: true,
    errMess: null,
    viewDones: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.VIEWDONES_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        viewDones: [],
      };
    case ActionTypes.VIEWDONE_FALIED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        viewDones: [],
      };
    case ActionTypes.ADD_VIEWDONE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        viewDones: action.payload,
      };
 

    default:
      return state;
  }
};
