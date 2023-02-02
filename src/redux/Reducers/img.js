import * as ActionTypes from "../ActionTypes";

export const Img = (
  state = {
    addErrMess: null,
    isAdded: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.IMAGE_ADD_FAILED:
      return {
        ...state,
        addErrMess: action.payload,
        isAdded: false,
      };
    case ActionTypes.IMAGE_IS_ADDED:
      return {
        ...state,
        addErrMess: null,
        isAdded: true,
      };

    default:
      return state;
  }
};
