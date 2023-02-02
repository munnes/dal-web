
import { baseUrl } from "../../shared/baseUrl";
import * as ActionTypes from "../ActionTypes";
//********************imge upload */

export const imageUpload = (file) => (dispatch) => {
  // const bearer = "Bearer " + localStorage.getItem("token");
  const formData = new FormData();
 
  formData.append("imageFile", file); //imageFile : name used in server
  return fetch(baseUrl + "imageUpload/", {
    method: "POST",
    body: formData,
    headers: {
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
    .then((images) => {
      console.log("Images Added", images);
      dispatch(imageAdded());
    })
    .catch((error) => {
      console.log("Upload Image ", error.message);
      dispatch(imageAddFailed(error.message));
    });
};

export const imageAdded = () => ({
  type: ActionTypes.IMAGE_IS_ADDED,
});
export const imageAddFailed = (addErrmess) => ({
  type: ActionTypes.IMAGE_ADD_FAILED,
  payload: addErrmess,
});

