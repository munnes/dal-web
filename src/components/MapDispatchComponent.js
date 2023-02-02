
import { actions } from "react-redux-form";
import { postCars, putCar, fetchCars } from "../redux/ActionCreators/CarActionCreators";
import { fetchBrands, postBrands, putBrand } from "../redux/ActionCreators/BrandActionCreators";
import { fetchCategories, postCategories, putCategory } from "../redux/ActionCreators/CategoryActionCreators";
import { fetchCompanies,postCompanies,putCompany } from "../redux/ActionCreators/CompanyActionCreators";
import {fetchDepartments,postDepartments,putDepartment} from "../redux/ActionCreators/DepartmentActionCreators"
import { fetchQuotas,postQuotas,putQuota } from "../redux/ActionCreators/QuotaActionCreators";
const MapDispatchToProps = (dispatch) => ({
  fetchCars: () => dispatch(fetchCars()),
  postCars: (car) => dispatch(postCars(car)),
  putCar: (cId, car) => dispatch(putCar(cId, car)),
  resetCarForm: () => {
    dispatch(actions.reset("fBrand"));
  },
  //*********** */
  fetchBrands: () => dispatch(fetchBrands()),
  postBrands: (brand) => dispatch(postBrands(brand)),
  putBrand: (bId, brand) => dispatch(putBrand(bId, brand)),
  resetBrandForm: () => {
    dispatch(actions.reset("fBrand"));
  },
  //************ */
  fetchCategories: () => dispatch(fetchCategories()),
  postCategories:(category)=>dispatch(postCategories(category)),
  putCategory:(cId,category)=>dispatch(putCategory(cId,category)),
  resetCategoryForm: () => {
    dispatch(actions.reset("fCategory"));
  },

  fetchCompanies: () => dispatch(fetchCompanies()),
  postCompanies:(company)=>dispatch(postCompanies(company)),
  putCompany:(cId,company)=>dispatch(putCompany(cId,company)),
  resetCompanyForm: () => {
    dispatch(actions.reset("fCompany"));
  },

  fetchDepartments:()=>dispatch(fetchDepartments()),
  postDepartments:(dept)=>dispatch(postDepartments(dept)),
  putDepartment:(dId,dept)=>dispatch(putDepartment(dId,dept)),
  resetDepartmentForm:() => {
    dispatch(actions.reset("fDepartment"));
  },

  fetchQuotas:()=>dispatch(fetchQuotas()),
  postQuotas:(quota)=>dispatch(postQuotas(quota)),
  putQuota:(qId,quota)=>dispatch(putQuota(qId,quota)),
  resetQuotaForm:() => {
    dispatch(actions.reset("fQuota"));
  },
})

export default MapDispatchToProps;