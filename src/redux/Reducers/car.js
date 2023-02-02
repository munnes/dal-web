
import * as ActionTypes from "../ActionTypes";

export const Cars = (
  state = {
    isLoading: true,
    errMess: null,
    cars: [],
    addErrMess: null,
    isAdded: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.CARS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        cars: [],
      };
    case ActionTypes.CARS_FALIED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        cars: [],
      };
    case ActionTypes.ADD_CARS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        cars: action.payload,
      };
    case ActionTypes.CAR_ADD_FAILED:
      return {
        ...state,
        addErrMess: action.payload,
        isAdded: false,
      };
    case ActionTypes.CAR_IS_ADDED:
      return {
        ...state,
        addErrMess: null,
        isAdded: true,
      };
      case ActionTypes.CAR_TO_UPDATE:
        return {
          ...state,
          isUpdated: false,
          isAdded: false,
          carUpdate: action.payload,
        };
    default:
      return state;
  }
};
