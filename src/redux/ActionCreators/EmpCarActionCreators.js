
import * as ActionTypes from "../ActionTypes";
import { baseUrl } from "../../shared/baseUrl";

//****POST */
export const postEmpCars = (empcar) => (dispatch) => {
 
  const bearer = "Bearer " + localStorage.getItem("token");
  return fetch(baseUrl + "empCars", {
    method: "POST",
    body: JSON.stringify(empcar),
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
    .then((cars) => {
      console.log("Car Added", cars);
      dispatch(empCarAdded(cars));
     
    })
    .catch((error) => dispatch(empCarAddFailed(error.message)));
};
//*************************GET */
export const fetchEmpCars = () => (dispatch) => {
  dispatch(empCarsLoading(true));
  return fetch(baseUrl + "empCars")
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
    .then((empCars) => dispatch(addEmpCars(empCars)))
    .catch((error) => dispatch(empCarsFailed(error.message)));
};

export const empCarsLoading = () => ({
  type: ActionTypes.EMPCARS_LOADING,
});

export const empCarsFailed = (errmess) => ({
  type: ActionTypes.EMPCARS_FALIED,
  payload: errmess,
});

export const addEmpCars = (empCars) => ({
  type: ActionTypes.ADD_EMPCARS,
  payload: empCars,
});

export const empCarAddFailed = (addErrmess) => ({
  type: ActionTypes.EMPCAR_ADD_FAILED,
  payload: addErrmess,
});

export const empCarAdded = (empCars) => ({
  type: ActionTypes.EMPCAR_IS_ADDED,
  payload: empCars,
});
export const empCarUpdated = () => ({
  type: ActionTypes.EMPCAR_IS_UPDATED,

});

export const empCarToUpdate = (empCar) => ({
  type: ActionTypes.EMPCAR_TO_UPDATE,
  payload: empCar,
});

//*********************DELETE */
export const deleteEmpCar = (empCarId) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch(baseUrl + "empCars/" + empCarId, {
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
    .then((empCar) => {
      console.log("EmpCar Deleted", empCar);
    })
    .catch((error) => dispatch(empCarsFailed(error.message)));
};
//**********************PUT */
export const selectedEmpCar = (empCar) => (dispatch) => {
  dispatch(empCarToUpdate(empCar));
};
export const putEmpCar = (empCarId, empCar) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch(baseUrl + "empCars/" + empCarId, {
    method: "PUT",
    body: JSON.stringify(empCar),
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
    .then((empCars) => {
      console.log("EmpCar updated ", empCars);
      dispatch(empCarUpdated());
    })
    .catch((error) => dispatch(empCarAddFailed(error.message)));
};


