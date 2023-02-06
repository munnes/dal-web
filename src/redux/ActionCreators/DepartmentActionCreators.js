

import * as ActionTypes from "../ActionTypes";
import { baseUrl } from "../../shared/baseUrl";

//****POST */
export const postDepartments = (department) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");
  return fetch(baseUrl + "departments", {
    method: "POST",
    body: JSON.stringify(department),
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
    .then((departments) => {
      console.log("Department Added", departments);
      dispatch(departmentAdded(departments));
      dispatch (fetchDepartments())

    })
    .catch((error) => dispatch(departmentAddFailed(error.message)));
};
//*************************GET */
export const fetchDepartments = () => (dispatch) => {
  dispatch(departmentsLoading(true));
  return fetch(baseUrl + "departments")
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
    .then((departments) => dispatch(addDepartments(departments)))
    .catch((error) => dispatch(departmentsFailed(error.message)));
};

export const departmentsLoading = () => ({
  type: ActionTypes.DEPARTMENTS_LOADING,
});

export const departmentsFailed = (errmess) => ({
  type: ActionTypes.DEPARTMENTS_FALIED,
  payload: errmess,
});

export const addDepartments = (departments) => ({
  type: ActionTypes.ADD_DEPARTMENTS,
  payload: departments,
});

export const departmentAddFailed = (addErrmess) => ({
  type: ActionTypes.DEPARTMENT_ADD_FAILED,
  payload: addErrmess,
});

export const departmentAdded = (departments) => ({
  type: ActionTypes.DEPARTMENT_IS_ADDED,
  payload: departments,
});
export const departmentUpdated = () => ({
  type: ActionTypes.DEPARTMENT_IS_UPDATED,

});

export const departmentToUpdate = (department) => ({
  type: ActionTypes.DEPARTMENT_TO_UPDATE,
  payload: department,
});

//*********************DELETE */
export const deleteDepartment = (departmentId) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch(baseUrl + "departments/" + departmentId, {
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
    .then((department) => {
      console.log("Department Deleted", department);
    })
    .catch((error) => dispatch(departmentsFailed(error.message)));
};
//**********************PUT */
export const selectedDepartment = (department) => (dispatch) => {
  dispatch(departmentToUpdate(department));
};
export const putDepartment = (departmentId, department) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch(baseUrl + "departments/" + departmentId, {
    method: "PUT",
    body: JSON.stringify(department),
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
    .then((departments) => {
      console.log("Department updated ", departments);
      dispatch(departmentUpdated());
    })
    .catch((error) => dispatch(departmentAddFailed(error.message)));
};


