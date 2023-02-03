

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
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { required, requiredErr, imgMatch } from "../shared/constVal";
import { baseUrl } from "../shared/baseUrl";
import Zoom from "react-medium-image-zoom";
class AddEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dComp: 0,
            dept: 0,
            photoName: "",
            selectedPhoto: null,
            qCategory: 0,
            cPlate: 0,
            cBrand: 0,
            isShowImg: false,
            photoDoc:""
        }
    }
    handleSubmit(values) {
        if (this.validate_pic()) {
            this.cantUpload();
        } else {
            const currentItem = {
                emp_name: values.emp_name,
                pic: this.state.photoName !== null
                    ? "images/" + this.state.photoName
                    : this.props.employeeUpdate.pic,
                comp_id: values.comp_id,
                d_id: values.d_id,
                car_id: values.car_id,
                cat_id: values.cat_id

            }
            if (this.state.photoName !== null) {
                this.props.imageUpload(this.state.selectedPhoto);
                if (this.props.departmentUpdate)
                    this.props.putEmployee(this.props.employeeUpdate.emp_id, currentItem)
                else
                    this.props.postEmployees(currentItem)
            }
            this.props.resetEmployeeForm()
        }
    }

    //**** */
    validate_pic() {
        if (this.props.employeeUpdate === null)
            return this.props.employees.find(
                (emp) => emp.pic === "images/" + this.state.fileName
            )
        else
            return this.props.employees.find(
                (emp) => emp.pic === "images/" + this.state.fileName
                    && emp.emp_id !== this.props.employees.emp_id
            )

    }
    //**************** */
    cantUpload = () => {
        confirmAlert({
            title: "Unable to Upload Image",
            message:
                "You can't upload image. " +
                "Because image with same name is already uploaded",
            buttons: [
                {
                    label: "Ok",
                    onClick: () => null,
                },
            ],
        });
    };
    //******* */
    changeHandler = (event) => {
        let phName = event.target.files[0].name;
        if (!phName.match(imgMatch))
            this.setState({ errPh: "You can upload only image files!" });
        else this.setState({ errPh: null });
        this.setState({
            selectedPhoto: event.target.files[0],
            photoName: phName,
            photoDoc: event.target.value,
        });
        const reader = new FileReader();
        reader.onload = () => {
            this.setState({
              imgFile:reader.result,
              isShowImg:true,
             fileName:phName
            })
         
          };
          reader.readAsDataURL( event.target.files[0]);
        event.preventDefault();
    };

  
    //     let phName = event.target.files[0].name;
    //     if (!phName.match(imgMatch)) {
    //         this.setState({ errPh: "You can upload only image files!", isShowImg: false });
    //         return
    //     }
    //     else this.setState({ errPh: null });

    //     //**** */
    //     let files;
    //     let fileName = null
    //     if (event.target)
    //         fileName = event.target.files[0].name//.slice(0, -4)
    //     if (event.dataTransfer) {
    //         files = event.dataTransfer.files;
    //     } else if (event.target) {
    //         files = event.target.files;
    //     }
    //  const reader = new FileReader();

    //     reader.onload = () => {
    //         this.setState({
    //             imgFile: event.target.files[0],//reader.result,
    //             isShowImg: true,
    //             fileName
    //         })

    //     };
    //     reader.readAsDataURL(files[0]);
    //     event.preventDefault();
    // };
    render() {
        var emp_name = '', car_id = 0, comp_id = 0, d_id = 0, cat_id = 0, b_id = 0;
        if (this.props.departmentUpdate) {
            emp_name = this.props.departmentUpdate.emp_name;
            comp_id = this.props.departmentUpdate.comp_id;
        }
        return <div className="container" style={{ marginTop: '2px' }} >
            <Breadcrumb className="breadcrumb">
                <BreadcrumbItem className="breadcrumb-item" active>
                    Add Employee
                </BreadcrumbItem>
                <BreadcrumbItem className="breadcrumb-item">
                    <Link className="link" to="/">
                        View Employees
                    </Link>
                </BreadcrumbItem>
            </Breadcrumb>
            <Card style={{ padding: "15px 15px 15px 15px" }}>
                <Form
                    model="fEmployee"
                    onSubmit={(values) => this.handleSubmit(values)}
                >
                    <Row>
                        <Col md={6}>
                            <Row className="form-group">
                                <Label htmlFor="emp_name" md={4}>
                                    Employee:
                                </Label>
                                <Col md={8}>
                                    <Control.text
                                        model="fEmployee.emp_name"
                                        id="emp_name"
                                        name="emp_name"
                                        defaultValue={emp_name}
                                        className="form-control"
                                        validators={{
                                            required,

                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model="fEmployee.emp_name"
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
                                <Label htmlFor="pic" md={4}>
                                    Picture :
                                </Label>
                                <Col md={this.props.employeeUpdate !== null || this.state.photoDoc !== '' ? 6 : 8}>
                                    <Control.file
                                        model="fEmployee.pic"
                                        id="pic"
                                        name="pic"
                                        value={this.state.photoDoc}
                                        className="form-control"
                                        onChange={this.changeHandler}
                                        validators={{
                                            required: (val) =>
                                                val != 0 || this.props.employeeUpdate != null,
                                        }}
                                    ></Control.file>
                                    <Errors
                                        className="text-danger"
                                        model="fEmployee.pic"
                                        show="touched"
                                        messages={{
                                            required: requiredErr,
                                        }}
                                    />
                                    {<div style={{ color: "#ed1b2e" }}>{this.state.errPh}</div>}
                                </Col>
                                {this.state.photoDoc !== '' ? (
                                    <Col md={2}>
                                        <Row className="form-group">
                                         
                                                <img
                                                    src={this.state.imgFile}
                                                    alt="crd"
                                                    style={{ width: "100px" }}
                                                />
                                            
                                        </Row>
                                    </Col>) :
                                    this.props.employeeUpdate != null ? (
                                        <Col md={2}>
                                            <Row className="form-group">
                                             
                                                    <img
                                                        src={baseUrl + this.props.employeeUpdate.pic}
                                                        alt="crd"
                                                        style={{ width: "100px" }}
                                                    />
                                               
                                            </Row>
                                        </Col>
                                    ) : null}

                            </Row>
                        </Col>

                        <Col md={6}>
                            <Row className="form-group">
                                <Label htmlFor="comp_id" md={4}>
                                    Company:
                                </Label>
                                <Col md={8}>
                                    <Control.select
                                        model="fEmployee.comp_id"
                                        id="comp_id"
                                        name="comp_id"
                                        defaultValue={comp_id}
                                        className="form-control"
                                        value={this.state.dComp}
                                        onChange={
                                            (e) =>
                                                this.setState({
                                                    dComp: parseInt(e.target.value),
                                                })
                                        }
                                        validators={{
                                            required,
                                        }}
                                    >
                                        <option value={0}>Select Company...</option>
                                        {this.props.companies
                                            .map((company) => (
                                                <option
                                                    value={company.comp_id}
                                                    key={company.comp_name}
                                                >
                                                    {company.comp_name}
                                                </option>
                                            ))}
                                    </Control.select>
                                    <Errors
                                        className="text-danger"
                                        model="fEmployee.comp_id"
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
                                <Label htmlFor="d_id" md={4}>
                                    Department:
                                </Label>
                                <Col md={8}>
                                    <Control.select
                                        model="fEmployee.d_id"
                                        id="d_id"
                                        name="d_id"
                                        defaultValue={d_id}
                                        className="form-control"
                                        value={this.state.dept}
                                        onChange={
                                            (e) =>
                                                this.setState({
                                                    dept: parseInt(e.target.value),
                                                })
                                        }
                                        validators={{
                                            required,
                                        }}
                                    >
                                        <option value={0}>Select Department...</option>
                                        {this.props.departments
                                            .filter((dept) => dept.comp_id === this.state.dComp)
                                            .map((dept) => (
                                                <option
                                                    value={dept.d_id}
                                                    key={dept.d_id}
                                                >
                                                    {dept.d_name}
                                                </option>
                                            ))}
                                    </Control.select>
                                    <Errors
                                        className="text-danger"
                                        model="fEmployee.d_id"
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
                                <Label htmlFor="b_id" md={4}>
                                    Car Brand:
                                </Label>
                                <Col md={8}>
                                    <Control.select
                                        model="fEmployee.b_id"
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
                                        model="fEmployee.b_id"
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
                                    Car:
                                </Label>
                                <Col md={8}>
                                    <Control.select
                                        model="fEmployee.car_id"
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
                                        <option value={0}>Select Plate...</option>
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
                                        model="fEmployee.car_id"
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
                                <Label htmlFor="cat_id" md={4}>
                                    Employees' Category:
                                </Label>
                                <Col md={8}>
                                    <Control.select
                                        model="fEmployee.cat_id"
                                        id="cat_id"
                                        name="cat_id"
                                        defaultValue={cat_id}
                                        className="form-control"
                                        value={this.state.qCategory}
                                        onChange={
                                            (e) =>
                                                this.setState({
                                                    qCategory: parseInt(e.target.value),
                                                })
                                        }
                                        validators={{
                                            required,
                                        }}
                                    >
                                        <option value={0}>Select Category...</option>
                                        {this.props.categories
                                            .map((category) => (
                                                <option
                                                    value={category.cat_id}
                                                    key={category.cat_id}
                                                >
                                                    {category.cat_name}
                                                </option>
                                            ))}
                                    </Control.select>
                                    <Errors
                                        className="text-danger"
                                        model="fEmployee.cat_id"
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
                                <Label></Label>
                                <Col >
                                    {!this.props.departmentUpdate ? (
                                        <Button
                                            type="submit"
                                            color="primary"
                                        // disabled={this.state.btnDis}
                                        >
                                            Add Employee
                                        </Button>
                                    ) : (
                                        <Button
                                            type="submit"
                                            color="primary"
                                        //  disabled={this.state.btnDis}
                                        >
                                            Update Employee
                                        </Button>
                                    )}
                                    &nbsp; &nbsp;
                                    <Button color="danger" onClick={() => this.props.resetEmployeeForm()}>
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
export default AddEmployee;

