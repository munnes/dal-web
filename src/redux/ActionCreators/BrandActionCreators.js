
import * as ActionTypes from "../ActionTypes";
import { baseUrl } from "../../shared/baseUrl";

//****POST */
export const postBrands = (brand) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");
  return fetch(baseUrl + "brands", {
    method: "POST",
    body: JSON.stringify(brand),
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
    .then((brands) => {
      console.log("Brand Added", brands);
      dispatch(brandAdded(brands));
      dispatch(fetchBrands())
    })
    .catch((error) => dispatch(brandAddFailed(error.message)));
};
//*************************GET */
export const fetchBrands = () => (dispatch) => {
  dispatch(brandsLoading(true));
  return fetch(baseUrl + "brands")
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
    .then((brands) => dispatch(addBrands(brands)))
    .catch((error) => dispatch(brandsFailed(error.message)));
};

export const brandsLoading = () => ({
  type: ActionTypes.BRANDS_LOADING,
});

export const brandsFailed = (errmess) => ({
  type: ActionTypes.BRANDS_FALIED,
  payload: errmess,
});

export const addBrands = (brands) => ({
  type: ActionTypes.ADD_BRANDS,
  payload: brands,
});

export const brandAddFailed = (addErrmess) => ({
  type: ActionTypes.BRAND_ADD_FAILED,
  payload: addErrmess,
});

export const brandAdded = (brands) => ({
  type: ActionTypes.BRAND_IS_ADDED,
  payload: brands,
});
export const brandUpdated = () => ({
  type: ActionTypes.BRAND_IS_UPDATED,

});

export const brandToUpdate = (brand) => ({
  type: ActionTypes.BRAND_TO_UPDATE,
  payload: brand,
});

//*********************DELETE */
export const deleteBrand = (brandId) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch(baseUrl + "brands/" + brandId, {
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
    .then((brand) => {
      console.log("Brand Deleted", brand);
    })
    .catch((error) => dispatch(brandsFailed(error.message)));
};
//**********************PUT */
export const selectedBrand = (brand) => (dispatch) => {
  dispatch(brandToUpdate(brand));
};
export const putBrand = (brandId, brand) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch(baseUrl + "brands/" + brandId, {
    method: "PUT",
    body: JSON.stringify(brand),
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
    .then((brands) => {
      console.log("Brand updated ", brands);
      dispatch(brandUpdated());
    })
    .catch((error) => dispatch(brandAddFailed(error.message)));
};
