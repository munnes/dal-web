
import * as ActionTypes from "../ActionTypes";

export const Brands = (
  state = {
    isLoading: true,
    errMess: null,
    brands: [],
    addErrMess: null,
    isAdded: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.BRANDS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        brands: [],
      };
    case ActionTypes.BRANDS_FALIED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        brands: [],
      };
    case ActionTypes.ADD_BRANDS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        brands: action.payload,
      };
    case ActionTypes.BRAND_ADD_FAILED:
      return {
        ...state,
        addErrMess: action.payload,
        isAdded: false,
      };
    case ActionTypes.BRAND_IS_ADDED:
      return {
        ...state,
        addErrMess: null,
        isAdded: true,
      };
      case ActionTypes.BRAND_TO_UPDATE:
        return {
          ...state,
          isUpdated: false,
          isAdded: false,
          brandUpdate: action.payload,
        };
    default:
      return state;
  }
};
