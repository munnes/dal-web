
import * as ActionTypes from "../ActionTypes";
import { baseUrl } from "../../shared/baseUrl";
export const fetchViewQuotas = () => (dispatch) => {
  //  const bearer = "Bearer " + localStorage.getItem("token");
  dispatch(viewQuotaLoading(true));
  return fetch(baseUrl + "vQuotas/", {
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
    .then((viewQuota) => dispatch(addViewQuota(viewQuota)))
    .catch((error) => dispatch(viewQuotaFailed(error.message)));
};
export const addViewQuota = (viewQuota) => ({
  type: ActionTypes.ADD_VIEWQUOTA,
  payload: viewQuota,
});
export const viewQuotaFailed = (errmess) => ({
  type: ActionTypes.VIEWQUOTA_FALIED,
  payload: errmess,
});
export const viewQuotaLoading = () => ({
  type: ActionTypes.VIEWQUOTAS_LOADING,
});


