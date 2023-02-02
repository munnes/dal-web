
const MapStateToProps = (state) => {
    return {
      brands: state.brands,
      cars: state.cars,
      categories:state.categories,
      companies:state.companies,
      departments:state.departments,
      quotas:state.quotas
    };
  };
  
  export default MapStateToProps;
  