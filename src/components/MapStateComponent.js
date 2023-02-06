
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
      viewQuotas:state.viewQuotas
    };
  };
  
  export default MapStateToProps;
  