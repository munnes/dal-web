

import * as ActionTypes from "../ActionTypes";

export const ViewDrivers = (
  state = {
    isLoading: true,
    errMess: null,
    viewDrivers: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.VIEWDRIVERS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        viewDrivers: [],
      };
    case ActionTypes.VIEWDRIVER_FALIED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        viewDrivers: [],
      };
    case ActionTypes.ADD_VIEWDRIVER:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        viewDrivers: action.payload,
      };
 

    default:
      return state;
  }
};
