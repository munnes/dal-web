


import * as ActionTypes from "../ActionTypes";
import { baseUrl } from "../../shared/baseUrl";
export const fetchViewCarHistory = () => (dispatch) => {
  //  const bearer = "Bearer " + localStorage.getItem("token");
  dispatch(viewCarHistoryLoading(true));
  return fetch(baseUrl + "carHistory/", {
    headers: {
      "Content-Type": "application/json",
      //  Authorization: bearer,
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      //if server not response no hear any thing from server
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((viewCarHistory) => dispatch(addViewCarHistory(viewCarHistory)))
    .catch((error) => dispatch(viewCarHistoryFailed(error.message)));
};
export const addViewCarHistory = (viewCarHistory) => ({
  type: ActionTypes.ADD_VIEWCARHISTORY,
  payload: viewCarHistory,
});
export const viewCarHistoryFailed = (errmess) => ({
  type: ActionTypes.VIEWCARHISTORY_FALIED,
  payload: errmess,
});
export const viewCarHistoryLoading = () => ({
  type: ActionTypes.VIEWCARHISTORIES_LOADING,
});


