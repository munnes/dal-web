
import * as ActionTypes from "../ActionTypes";
import { baseUrl } from "../../shared/baseUrl";

//****POST */
export const postCompanies = (company) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");
  return fetch(baseUrl + "companies", {
    method: "POST",
    body: JSON.stringify(company),
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
    .then((companies) => {
      console.log("Company Added", companies);
      dispatch(companyAdded(companies));
      dispatch (fetchCompanies())

    })
    .catch((error) => dispatch(companyAddFailed(error.message)));
};
//*************************GET */
export const fetchCompanies = () => (dispatch) => {
  dispatch(companiesLoading(true));
  return fetch(baseUrl + "companies")
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
    .then((companies) => dispatch(addCompanies(companies)))
    .catch((error) => dispatch(companiesFailed(error.message)));
};

export const companiesLoading = () => ({
  type: ActionTypes.COMPANIES_LOADING,
});

export const companiesFailed = (errmess) => ({
  type: ActionTypes.COMPANIES_FALIED,
  payload: errmess,
});

export const addCompanies = (companies) => ({
  type: ActionTypes.ADD_COMPANIES,
  payload: companies,
});

export const companyAddFailed = (addErrmess) => ({
  type: ActionTypes.COMPANY_ADD_FAILED,
  payload: addErrmess,
});

export const companyAdded = (companies) => ({
  type: ActionTypes.COMPANY_IS_ADDED,
  payload: companies,
});
export const companyUpdated = () => ({
  type: ActionTypes.COMPANY_IS_UPDATED,

});

export const companyToUpdate = (company) => ({
  type: ActionTypes.COMPANY_TO_UPDATE,
  payload: company,
});

//*********************DELETE */
export const deleteCompany = (companyId) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch(baseUrl + "companies/" + companyId, {
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
    .then((company) => {
      console.log("Company Deleted", company);
    })
    .catch((error) => dispatch(companiesFailed(error.message)));
};
//**********************PUT */
export const selectedCompany = (company) => (dispatch) => {
  dispatch(companyToUpdate(company));
};
export const putCompany = (companyId, company) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch(baseUrl + "companies/" + companyId, {
    method: "PUT",
    body: JSON.stringify(company),
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
    .then((companies) => {
      console.log("Company updated ", companies);
      dispatch(companyUpdated());
    })
    .catch((error) => dispatch(companyAddFailed(error.message)));
};


