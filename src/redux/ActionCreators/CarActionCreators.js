
import * as ActionTypes from "../ActionTypes";
import { baseUrl } from "../../shared/baseUrl";
import { fetchViewDriver } from "./ViewDriverActionCreators";

//****POST */
export const postCars = (car) => (dispatch) => {
 
  const bearer = "Bearer " + localStorage.getItem("token");
  return fetch(baseUrl + "cars", {
    method: "POST",
    body: JSON.stringify(car),
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
      dispatch(carAdded(cars));
      dispatch(fetchCars())
      dispatch(fetchViewDriver())

    })
    .catch((error) => dispatch(carAddFailed(error.message+car.fuel)));
};
//*************************GET */
export const fetchCars = () => (dispatch) => {
  dispatch(carsLoading(true));
  return fetch(baseUrl + "cars")
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
    .then((cars) => dispatch(addCars(cars)))
    .catch((error) => dispatch(carsFailed(error.message)));
};

export const carsLoading = () => ({
  type: ActionTypes.CARS_LOADING,
});

export const carsFailed = (errmess) => ({
  type: ActionTypes.CARS_FALIED,
  payload: errmess,
});

export const addCars = (cars) => ({
  type: ActionTypes.ADD_CARS,
  payload: cars,
});

export const carAddFailed = (addErrmess) => ({
  type: ActionTypes.CAR_ADD_FAILED,
  payload: addErrmess,
});

export const carAdded = (cars) => ({
  type: ActionTypes.CAR_IS_ADDED,
  payload: cars,
});
export const carUpdated = () => ({
  type: ActionTypes.CAR_IS_UPDATED,

});

export const carToUpdate = (car) => ({
  type: ActionTypes.CAR_TO_UPDATE,
  payload: car,
});

//*********************DELETE */
export const deleteCar = (carId) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch(baseUrl + "cars/" + carId, {
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
    .then((car) => {
      console.log("Car Deleted", car);
    })
    .catch((error) => dispatch(carsFailed(error.message)));
};
//**********************PUT */
export const selectedCar = (car) => (dispatch) => {
  dispatch(carToUpdate(car));
};
export const putCar = (carId, car) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch(baseUrl + "cars/" + carId, {
    method: "PUT",
    body: JSON.stringify(car),
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
    .then((cars) => {
      console.log("Car updated ", cars);
      dispatch(carUpdated());
    })
    .catch((error) => dispatch(carAddFailed(error.message)));
};
