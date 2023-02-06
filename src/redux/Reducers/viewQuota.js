

import * as ActionTypes from "../ActionTypes";

export const ViewQuotas = (
  state = {
    isLoading: true,
    errMess: null,
    viewQuotas: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.VIEWQUOTAS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        viewQuotas: [],
      };
    case ActionTypes.VIEWQUOTA_FALIED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        viewQuotas: [],
      };
    case ActionTypes.ADD_VIEWQUOTA:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        viewQuotas: action.payload,
      };
 

    default:
      return state;
  }
};
