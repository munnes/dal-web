
import * as ActionTypes from "../ActionTypes";
import { baseUrl } from "../../shared/baseUrl";
import { fetchQuotas } from "./QuotaActionCreators";

//****POST */
export const postCategories = (category) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");
  return fetch(baseUrl + "categories", {
    method: "POST",
    body: JSON.stringify(category),
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
    .then((categories) => {
      console.log("Category Added", categories);
      dispatch(categoryAdded(categories));
      dispatch(fetchCategories())
    
    })
    .catch((error) => dispatch(categoryAddFailed(error.message)));
};
//*************************GET */
export const fetchCategories = () => (dispatch) => {
  dispatch(categoriesLoading(true));
  return fetch(baseUrl + "categories")
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
    .then((categories) => dispatch(addCategories(categories)))
    .catch((error) => dispatch(categoriesFailed(error.message)));
};

export const categoriesLoading = () => ({
  type: ActionTypes.CATEGORIES_LOADING,
});

export const categoriesFailed = (errmess) => ({
  type: ActionTypes.CATEGORIES_FALIED,
  payload: errmess,
});

export const addCategories = (categories) => ({
  type: ActionTypes.ADD_CATEGORIES,
  payload: categories,
});

export const categoryAddFailed = (addErrmess) => ({
  type: ActionTypes.CATEGORY_ADD_FAILED,
  payload: addErrmess,
});

export const categoryAdded = (categories) => ({
  type: ActionTypes.CATEGORY_IS_ADDED,
  payload: categories,
});
export const categoryUpdated = () => ({
  type: ActionTypes.CATEGORY_IS_UPDATED,

});

export const categoryToUpdate = (category) => ({
  type: ActionTypes.CATEGORY_TO_UPDATE,
  payload: category,
});

//*********************DELETE */
export const deleteCategory = (categoryId) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch(baseUrl + "categories/" + categoryId, {
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
    .then((category) => {
      console.log("Category Deleted", category);
    })
    .catch((error) => dispatch(categoriesFailed(error.message)));
};
//**********************PUT */
export const selectedCategory = (category) => (dispatch) => {
  dispatch(categoryToUpdate(category));
};
export const putCategory = (categoryId, category) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch(baseUrl + "categories/" + categoryId, {
    method: "PUT",
    body: JSON.stringify(category),
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
    .then((categories) => {
      console.log("Category updated ", categories);
      dispatch(categoryUpdated());
    })
    .catch((error) => dispatch(categoryAddFailed(error.message)));
};


