
const MapStateToProps = (state) => {
    return {
      brands: state.brands,
      cars: state.cars,
      categories:state.categories,
      companies:state.companies,
      departments:state.departments,
      quotas:state.quotas,
      viewDrivers:state.viewDrivers,
      employees:state.employees,
      auth:state.auth,
      viewQuotas:state.viewQuotas,
      viewDones:state.viewDones,
      empCars:state.empCars,
      viewCarHistories:state.viewCarHistories
    };
  };
  
  export default MapStateToProps;
  