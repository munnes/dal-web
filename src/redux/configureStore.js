
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Cars } from "./Reducers/car";
import { Brands } from "./Reducers/brand";
import { Categories } from "./Reducers/category";
import { Companies } from "./Reducers/company";
import { Departments } from "./Reducers/department";
import { Employees } from "./Reducers/employee";
import { Quotas } from "./Reducers/quota";
import { Img } from "./Reducers/img";
import { ViewDrivers } from "./Reducers/viewDriver";
import {Auth} from './Reducers/auth'
import {ViewQuotas} from './Reducers/viewQuota'
import thunk from "redux-thunk";
import logger from "redux-logger";
import { createForms } from "react-redux-form";

import {
    InitialCar,
    InitialBrand,
    InitialCategory,
    InitialCompany,
    InitialDepartment,
    InitialQuota,
    InitialEmployee
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
            auth:Auth,
            viewDrivers:ViewDrivers,
            viewQuotas:ViewQuotas,
            ...createForms({
                fBrand: InitialBrand,
                fCar: InitialCar,
                fCategory: InitialCategory,
                fCompany:InitialCompany,
                fDepartment:InitialDepartment,
                fQuota:InitialQuota,
                fEmployee:InitialEmployee
            })
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
};
