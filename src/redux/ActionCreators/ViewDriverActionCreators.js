
import * as ActionTypes from "../ActionTypes";
import { baseUrl } from "../../shared/baseUrl";
export const fetchViewDriver = () => (dispatch) => {
  //  const bearer = "Bearer " + localStorage.getItem("token");
  dispatch(viewDriverLoading(true));
  return fetch(baseUrl + "viewDrivers/", {
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
    .then((viewDriver) => dispatch(addViewDriver(viewDriver)))
    .catch((error) => dispatch(viewDriverFailed(error.message)));
};
export const addViewDriver = (viewDriver) => ({
  type: ActionTypes.ADD_VIEWDRIVER,
  payload: viewDriver,
});
export const viewDriverFailed = (errmess) => ({
  type: ActionTypes.VIEWDRIVER_FALIED,
  payload: errmess,
});
export const viewDriverLoading = () => ({
  type: ActionTypes.VIEWDRIVERS_LOADING,
});


