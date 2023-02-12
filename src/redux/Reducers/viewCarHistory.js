


import * as ActionTypes from "../ActionTypes";

export const ViewCarHistories = (
  state = {
    isLoading: true,
    errMess: null,
    viewCarHistories: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.VIEWCARHISTORIES_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        viewCarHistories: [],
      };
    case ActionTypes.VIEWCARHISTORY_FALIED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        viewCarHistories: [],
      };
    case ActionTypes.ADD_VIEWCARHISTORY:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        viewCarHistories: action.payload,
      };
 

    default:
      return state;
  }
};
