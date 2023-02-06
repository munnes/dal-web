
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
import { required, requiredErr } from "../../shared/constVal";
import { Loading } from "../LoadingComponent";
class AddCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cBrand: 0,
            cFuel: 0
        }
    }
    handleSubmit(values) {

        const currentItem = {
            plate: values.plate,
            b_id: values.b_id,
            fuel: values.fuel
        }
        if (this.props.carUpdate)
            this.props.putCar(this.props.carUpdate.c_id, currentItem)
        else
            this.props.postCars(currentItem)
        this.resetForm()

    }
    resetForm = () => {
        this.props.resetCarForm()
        this.setState({ cBrand: 0, cFuel: 0 })
    }

    render() {
        var b_id = 0, plate = '', fuel = 0;
        if (this.props.carUpdate) {

            b_id = this.props.carUpdate.b_id;
            plate = this.props.carUpdate.plate;
            fuel = this.props.carUpdate.fuel
        }
        if (this.props.isLoading)
            return <Loading />
        else if (this.props.errMess)
            return <h3 style={{ color: 'red' }}>{this.props.errMess}</h3>
        else
            return <div className="container" style={{ marginTop: '2px' }} >
                <Breadcrumb className="breadcrumb">
                    <BreadcrumbItem className="breadcrumb-item" active>
                        Add Car
                    </BreadcrumbItem>
                    <BreadcrumbItem className="breadcrumb-item">
                        <Link className="link" to="/">
                            View Cars
                        </Link>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Card className="crdFrame">
                    <Form
                        model="fCar"
                        onSubmit={(values) => this.handleSubmit(values)}
                    >
                        <Row>
                            <Col md={6}>
                                <Row className="form-group">
                                    <Label htmlFor="b_id" md={4}>
                                        Car Brand:
                                    </Label>
                                    <Col md={8}>
                                        <Control.select
                                            model="fCar.b_id"
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
                                            <option value={0}>Select Brand...</option>
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
                                            model="fCar.b_id"
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
                                        Plate No:
                                    </Label>
                                    <Col md={8}>
                                        <Control.text
                                            model="fCar.plate"
                                            id="plate"
                                            name="plate"
                                            defaultValue={plate}
                                            className="form-control"
                                            validators={{
                                                required,
                                                isAdded: (plate) => !this.props.cars.some((car) =>
                                                    car.plate.toLowerCase() === plate.toLowerCase())
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model="fCar.plate"
                                            show="touched"
                                            messages={{
                                                required: requiredErr,
                                                isAdded: 'Sorry, Plate number already added'
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </Col>

                            <Col md={6}>

                                <Row className="form-group">
                                    <Label htmlFor="fuel" md={4}>
                                        Fuel:
                                    </Label>
                                    <Col md={8}>
                                        <Control.select
                                            model="fCar.fuel"
                                            id="fuel"
                                            name="fuel"
                                            defaultValue={fuel}
                                            className="form-control"
                                            value={this.state.cFuel}
                                            onChange={
                                                (e) =>
                                                    this.setState({
                                                        cFuel: parseInt(e.target.value),
                                                    })
                                            }
                                            validators={{
                                                required,
                                            }}
                                        >
                                            <option value={0}>Select Fuel...</option>
                                            {[{ f_id: 1, f_name: 'Gasoline' }, { f_id: 2, f_name: 'Oil' }]
                                                .map((fuel) => (
                                                    <option
                                                        value={fuel.f_id}
                                                        key={fuel.f_id}
                                                    >
                                                        {fuel.f_name}
                                                    </option>
                                                ))}
                                        </Control.select>
                                        <Errors
                                            className="text-danger"
                                            model="fCar.fuel"
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
                                                Add Car
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
export default AddCar;

