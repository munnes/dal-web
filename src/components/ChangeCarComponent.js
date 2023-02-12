


import React, { Component } from "react";

import {
    Button,
    Row,
    Col,
    Label,
    Breadcrumb,
    BreadcrumbItem,
    Card,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, Form, Errors } from "react-redux-form";
import { currenDate, required, requiredErr } from "../shared/constVal";
import { Loading } from "./LoadingComponent";

class ChangeCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cEmployee: 0,
            cCar: 0,
            cBrand: 0
        }
    }
    handleSubmit(values) {

        const currentItem = {
            emp_id: values.emp_id,
            car_id: values.car_id,
            start: currenDate
        }
     
            this.props.postEmpCars(currentItem)
            let lastEmpCat = this.props.empCars.find((c) => c.emp_id === +values.emp_id && !c.end)
            this.props.putEmpCar(lastEmpCat.emp_car_id,{end:currenDate})
            this.props.putEmployee(values.emp_id, { car_id: values.car_id })
       
        this.resetForm()

    }
    resetForm = () => {
      //  this.props.resetCarEmpForm()
        this.setState({ cEmployee: 0, cCar: 0,cBrand:0 })
    }

    render() {
        var emp_id = 0, b_id = 0, car_id = 0;
      /*  if (this.props.carUpdate) {

            emp_id = this.props.carUpdate.emp_id;
            plate = this.props.carUpdate.plate;
            car_id = this.props.carUpdate.car_id
        }*/
        if (this.props.isLoading)
            return <Loading />
        else if (this.props.errMess)
            return <h3 style={{ color: 'red' }}>{this.props.errMess}</h3>
        else
            return <div className="container" style={{ marginTop: '2px' }} >
               
                <Card className="crdFrame">
                    <Form
                        model="fEmpCar"
                        onSubmit={(values) => this.handleSubmit(values)}
                    >
                        <Row>
                            <Col md={6}>
                                <Row className="form-group">
                                    <Label htmlFor="emp_id" md={4}>
                                        Employee:
                                    </Label>
                                    <Col md={8}>
                                        <Control.select
                                            model="fEmpCar.emp_id"
                                            id="emp_id"
                                            name="emp_id"
                                            defaultValue={emp_id}
                                            className="form-control"
                                            value={this.state.cEmployee}
                                            onChange={
                                                (e) =>
                                                    this.setState({
                                                        cEmployee: parseInt(e.target.value),
                                                    })
                                            }
                                            validators={{
                                                required,
                                            }}
                                        >
                                            <option value={0}>Select Employee...</option>
                                            {this.props.employees
                                                .map((e) => (
                                                    <option
                                                        value={e.emp_id}
                                                        key={e.emp_id}
                                                    >
                                                        {e.emp_name}
                                                    </option>
                                                ))}
                                        </Control.select>
                                        <Errors
                                            className="text-danger"
                                            model="fEmpCar.emp_id"
                                            show="touched"
                                            messages={{
                                                required: requiredErr,
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </Col>

                            <Col md={6}>
                                <Row className="form-group">
                                    <Label htmlFor="plate" md={4}>
                                        Current Car:
                                    </Label>
                                    
                                       <Label md={8} style={{color:'blue',fontWeight:'bold'}}>{this.state.cEmployee?this.props.viewDrivers
                                                .filter((drv) =>drv.emp_id===+this.state.cEmployee)
                                                .map((car)=>
                                                car.fuel === 1 ? car.b_name + '-' + car.plate + ' (Gasoline)' :
                                                            car.b_name + '-' + car.plate + ' (Oil)'):null}</Label>
                                    
                                </Row>
                            </Col>
                            <Col md={6}>
                                <Row className="form-group">
                                    <Label htmlFor="b_id" md={4}>
                                        Car Brand:
                                    </Label>
                                    <Col md={8}>
                                        <Control.select
                                            model="fEmpCar.b_id"
                                            id="b_id"
                                            name="b_id"
                                            defaultValue={b_id}
                                            className="form-control"
                                            value={this.state.cBrand}
                                            onChange={
                                                (e) =>
                                                    this.setState({
                                                        cBrand: parseInt(e.target.value),
                                                    })
                                            }
                                            validators={{
                                                required,
                                            }}
                                        >
                                            <option value={0}>Select Car Brand...</option>
                                            {this.props.brands
                                                .map((brand) => (
                                                    <option
                                                        value={brand.b_id}
                                                        key={brand.b_id}
                                                    >
                                                        {brand.b_name}
                                                    </option>
                                                ))}
                                        </Control.select>
                                        <Errors
                                            className="text-danger"
                                            model="fEmpCar.b_id"
                                            show="touched"
                                            messages={{
                                                required: requiredErr,
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={6}>
                                <Row className="form-group">
                                    <Label htmlFor="car_id" md={4}>
                                        Assign Car:
                                    </Label>
                                    <Col md={8}>
                                        <Control.select
                                            model="fEmpCar.car_id"
                                            id="car_id"
                                            name="car_id"
                                            defaultValue={car_id}
                                            className="form-control"
                                            value={this.state.cPlate}
                                            onChange={
                                                (e) =>
                                                    this.setState({
                                                        cPlate: parseInt(e.target.value),
                                                    })
                                            }
                                            validators={{
                                                required,
                                            }}
                                        >
                                            <option value={0}>Assign Car...</option>
                                            {this.props.viewDrivers
                                                .filter((drv) => !drv.emp_id && drv.b_id === this.state.cBrand)
                                                .map((car) => (
                                                    <option
                                                        value={car.car_id}
                                                        key={car.car_id}
                                                    >
                                                        {car.fuel === 1 ? car.b_name + '-' + car.plate + ' (Gasoline)' :
                                                            car.b_name + '-' + car.plate + ' (Oil)'
                                                        }
                                                    </option>
                                                ))}
                                        </Control.select>
                                        <Errors
                                            className="text-danger"
                                            model="fEmpCar.car_id"
                                            show="touched"
                                            messages={{
                                                required: requiredErr,
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={{ size: 4, offset: 2 }}>
                                <Row className="form-group">
                                    <Col >
                                        {!this.props.carUpdate ? (
                                            <Button
                                                type="submit"
                                                color="primary"
                                            // disabled={this.state.btnDis}
                                            >
                                                Change Car
                                            </Button>
                                        ) : (
                                            <Button
                                                type="submit"
                                                color="primary"
                                            //  disabled={this.state.btnDis}
                                            >
                                                Update Car
                                            </Button>
                                        )}
                                        &nbsp; &nbsp;
                                        <Button color="danger" onClick={() => this.resetForm()}>
                                            Reset
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </div>
    }
}
export default ChangeCar;

