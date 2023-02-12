

import * as ActionTypes from "../ActionTypes";
import { baseUrl } from "../../shared/baseUrl";
export const fetchViewDone = () => (dispatch) => {
  //  const bearer = "Bearer " + localStorage.getItem("token");
  dispatch(viewDoneLoading(true));
  return fetch(baseUrl + "viewDones/", {
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
    .then((viewDone) => dispatch(addViewDone(viewDone)))
    .catch((error) => dispatch(viewDoneFailed(error.message)));
};
export const addViewDone = (viewDone) => ({
  type: ActionTypes.ADD_VIEWDONE,
  payload: viewDone,
});
export const viewDoneFailed = (errmess) => ({
  type: ActionTypes.VIEWDONE_FALIED,
  payload: errmess,
});
export const viewDoneLoading = () => ({
  type: ActionTypes.VIEWDONES_LOADING,
});


