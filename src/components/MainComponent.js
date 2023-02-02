
import React, { useEffect, useState, useRef } from "react";
import { Routes, Route, Navigate, withRouter } from "react-router-dom";
import MapDispatchToProps from "./MapDispatchComponent";
import MapStateToProps from "./MapStateComponent";
import { connect } from "react-redux";
import Header from "./HeaderComponent";
import AddCar from "./Master/AddCarComponent";
import AddBrand from "./Master/AddBrandComponent";
import AddCategory from "./Master/AddCategoryComponent";
import AddCompany from "./Master/AddCompanyComponent";
import AddDepartment from "./Master/AddDepartmentComponent";
import AddQuota from "./Master/AddQuotaComponent";
const Home = () => <div>tttt</div>
const Main = ({ ...props }) => {
    React.useEffect(() => {
        //********** */
        props.fetchCars();
        props.fetchBrands();
        props.fetchCategories()
        props.fetchCompanies()

    }, [])



    return <div className="main">
        <Header />
        <Routes >
            <Route path="/" element={<Home />}
            />
            <Route path="/addCar" element={<AddCar
                carUpdate={props.cars.carUpdate}
                putCar={props.putCar}
                postCars={props.postCars}
                brands={props.brands.brands}
                resetCarForm={props.resetCarForm}

            />} />
            <Route path="/addBrand" element={<AddBrand
                carUpdate={props.brands.brandUpdate}
                putBrand={props.putBrand}
                postBrands={props.postBrands}
                resetBrandForm={props.resetBrandForm}
            />} />

            <Route path="/addCategory" element={<AddCategory
                categoryUpdate={props.categories.categoryUpdate}
                putCategory={props.putCategory}
                postCategories={props.postCategories}
                resetCategoryForm={props.resetCategoryForm}
            />} />


            <Route path="/addCompany" element={<AddCompany
                companyUpdate={props.companies.companyUpdate}
                putCompany={props.putCompany}
                postCompanies={props.postCompanies}
                resetCompanyForm={props.resetCompanyForm}
            />} />
            <Route path="/addDepartment" element={<AddDepartment
                departmentUpdate={props.departments.departmentUpdate}
                putDepartment={props.putDepartment}
                postDepartments={props.postDepartments}
                companies={props.companies.companies}
                resetDepartmentForm={props.resetDepartmentForm}
            />} />

            <Route path="/addQuota" element={<AddQuota
                quotaUpdate={props.quotas.quotaUpdate}
                putQuota={props.putQuota}
                postQuotas={props.postQuotas}
                categories={props.categories.categories}
                resetQuotaForm={props.resetQuotaForm}
            />} />

        </Routes>
    </div>
}
export default connect(MapStateToProps, MapDispatchToProps)(Main);