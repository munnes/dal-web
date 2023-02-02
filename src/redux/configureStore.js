
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Cars } from "./Reducers/car";
import { Brands } from "./Reducers/brand";
import { Categories } from "./Reducers/category";
import { Companies } from "./Reducers/company";
import { Departments } from "./Reducers/department";
import { Employees } from "./Reducers/employee";
import { Quotas } from "./Reducers/quota";
import { Img } from "./Reducers/img";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { createForms } from "react-redux-form";
import {
    InitialCar,
    InitialBrand,
    InitialCategory,
    InitialCompany,
    InitialDepartment,
    InitialQuota
} from "./forms";


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            cars: Cars,
            categories: Categories,
            companies: Companies,
            departments: Departments,
            employees: Employees,
            quotas: Quotas,
            brands: Brands,
            img:Img,
            ...createForms({
                fBrand: InitialBrand,
                fCar: InitialCar,
                fCategory: InitialCategory,
                fCompany:InitialCompany,
                fDepartment:InitialDepartment,
                fQuota:InitialQuota
            })
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
};
