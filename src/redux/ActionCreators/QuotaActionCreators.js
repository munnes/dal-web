

import * as ActionTypes from "../ActionTypes";
import { baseUrl } from "../../shared/baseUrl";
import { fetchViewQuotas } from "./ViewQuotaActionCreators";

//****POST */
export const postQuotas = (quota) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");
  return fetch(baseUrl + "quotas", {
    method: "POST",
    body: JSON.stringify(quota),
    headers: {
      "Content-Type": "application/json",
     // Authorization: bearer,
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
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((quotas) => {
      console.log("Quota Added", quotas);
      dispatch(quotaAdded(quotas));
      dispatch(fetchViewQuotas())
    })
    .catch((error) => dispatch(quotaAddFailed(error.message)));
};
//*************************GET */
export const fetchQuotas = () => (dispatch) => {
  dispatch(quotasLoading(true));
  return fetch(baseUrl + "quotas")
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
    .then((quotas) => dispatch(addQuotas(quotas)))
    .catch((error) => dispatch(quotasFailed(error.message)));
};

export const quotasLoading = () => ({
  type: ActionTypes.QUOTAS_LOADING,
});

export const quotasFailed = (errmess) => ({
  type: ActionTypes.QUOTAS_FALIED,
  payload: errmess,
});

export const addQuotas = (quotas) => ({
  type: ActionTypes.ADD_QUOTAS,
  payload: quotas,
});

export const quotaAddFailed = (addErrmess) => ({
  type: ActionTypes.QUOTA_ADD_FAILED,
  payload: addErrmess,
});

export const quotaAdded = (quotas) => ({
  type: ActionTypes.QUOTA_IS_ADDED,
  payload: quotas,
});
export const quotaUpdated = () => ({
  type: ActionTypes.QUOTA_IS_UPDATED,

});

export const quotaToUpdate = (quota) => ({
  type: ActionTypes.QUOTA_TO_UPDATE,
  payload: quota,
});

//*********************DELETE */
export const deleteQuota = (quotaId) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch(baseUrl + "quotas/" + quotaId, {
    method: "DELETE",
    headers: {
      Authorization: bearer,
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
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((quota) => {
      console.log("Quota Deleted", quota);
    })
    .catch((error) => dispatch(quotasFailed(error.message)));
};
//**********************PUT */
export const selectedQuota = (quota) => (dispatch) => {
  dispatch(quotaToUpdate(quota));
};
export const putQuota = (quotaId, quota) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch(baseUrl + "quotas/" + quotaId, {
    method: "PUT",
    body: JSON.stringify(quota),
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
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
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((quotas) => {
      console.log("Quota updated ", quotas);
      dispatch(quotaUpdated());
    })
    .catch((error) => dispatch(quotaAddFailed(error.message)));
};


