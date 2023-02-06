
import * as ActionTypes from "../ActionTypes";
import { baseUrl } from "../../shared/baseUrl";
import { signupUser } from "./UserActionCreators";
import { fetchViewDriver } from "./ViewDriverActionCreators";

//****POST */
export const postEmployees = (employee) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");
  return fetch(baseUrl + "employees", {
    method: "POST",
    body: JSON.stringify(employee),
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
    .then((employees) => {
      console.log("Employee Added", employees);
      dispatch(employeeAdded(employees));
      dispatch(signupUser({username:'user'+employees.emp_id,
      password:'Dal@2023',
      emp_id:employees.emp_id}))
      dispatch (fetchViewDriver())

    })
    .catch((error) => dispatch(employeeAddFailed(error.message)));
};
//*************************GET */
export const fetchEmployees = () => (dispatch) => {
  dispatch(employeesLoading(true));
  return fetch(baseUrl + "employees")
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
    .then((employees) => dispatch(addEmployees(employees)))
    .catch((error) => dispatch(employeesFailed(error.message)));
};

export const employeesLoading = () => ({
  type: ActionTypes.EMPLOYEES_LOADING,
});

export const employeesFailed = (errmess) => ({
  type: ActionTypes.EMPLOYEES_FALIED,
  payload: errmess,
});

export const addEmployees = (employees) => ({
  type: ActionTypes.ADD_EMPLOYEES,
  payload: employees,
});

export const employeeAddFailed = (addErrmess) => ({
  type: ActionTypes.EMPLOYEE_ADD_FAILED,
  payload: addErrmess,
});

export const employeeAdded = (employees) => ({
  type: ActionTypes.EMPLOYEE_IS_ADDED,
  payload: employees,
});
export const employeeUpdated = () => ({
  type: ActionTypes.EMPLOYEE_IS_UPDATED,

});

export const employeeToUpdate = (employee) => ({
  type: ActionTypes.EMPLOYEE_TO_UPDATE,
  payload: employee,
});

//*********************DELETE */
export const deleteEmployee = (employeeId) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch(baseUrl + "employees/" + employeeId, {
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
    .then((employee) => {
      console.log("Employee Deleted", employee);
    })
    .catch((error) => dispatch(employeesFailed(error.message)));
};
//**********************PUT */
export const selectedEmployee = (employee) => (dispatch) => {
  dispatch(employeeToUpdate(employee));
};
export const putEmployee = (employeeId, employee) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch(baseUrl + "employees/" + employeeId, {
    method: "PUT",
    body: JSON.stringify(employee),
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
    .then((employees) => {
      console.log("Employee updated ", employees);
      dispatch(employeeUpdated());
    })
    .catch((error) => dispatch(employeeAddFailed(error.message)));
};


