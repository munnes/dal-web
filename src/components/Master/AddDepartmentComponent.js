
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
class AddDepartment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dComp: 0,
        }
    }
    handleSubmit(values) {

        const currentItem = {
            d_name: values.d_name,
            comp_id: values.comp_id,

        }
        if (this.props.departmentUpdate)
            this.props.putDepartment(this.props.departmentUpdate.d_id, currentItem)
        else
            this.props.postDepartments(currentItem)
        this.resetForm()

    }
    resetForm = () => {
        this.props.resetDepartmentForm()
        this.setState({ dComp: 0 })
    }
    render() {
        var d_name = '', comp_id = 0;
        if (this.props.departmentUpdate) {
            d_name = this.props.departmentUpdate.d_name;
            comp_id = this.props.departmentUpdate.comp_id;
        }
        if (this.props.isLoading)
            return <Loading />
        else if (this.props.errMess)
            return <h3 style={{ color: 'red' }}>{this.props.errMess}</h3>
        else
            return <div className="container" style={{ marginTop: '2px' }} >
                <Breadcrumb className="breadcrumb">
                    <BreadcrumbItem className="breadcrumb-item" active>
                        Add Department
                    </BreadcrumbItem>
                    <BreadcrumbItem className="breadcrumb-item">
                        <Link className="link" to="/">
                            View Departments
                        </Link>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Card className="crdFrame">
                    <Form
                        model="fDepartment"
                        onSubmit={(values) => this.handleSubmit(values)}
                    >
                        <Row>
                            <Col md={6}>
                                <Row className="form-group">
                                    <Label htmlFor="comp_id" md={4}>
                                        Company:
                                    </Label>
                                    <Col md={8}>
                                        <Control.select
                                            model="fDepartment.comp_id"
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
                                            model="fDepartment.comp_id"
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
                                    <Label htmlFor="d_name" md={4}>
                                        Department:
                                    </Label>
                                    <Col md={8}>
                                        <Control.text
                                            model="fDepartment.d_name"
                                            id="d_name"
                                            name="d_name"
                                            defaultValue={d_name}
                                            className="form-control"
                                            validators={{
                                                required,
                                                isAdded: (dept) => !this.props.departments.some((department) =>
                                                    department.d_name.toLowerCase().trim() === dept.toLowerCase().trim() &&
                                                    department.comp_id === this.state.dComp)
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model="fDepartment.d_name"
                                            show="touched"
                                            messages={{
                                                required: requiredErr,
                                                isAdded: 'Sorry, Department already added for this company'
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </Col>

                            <Col md={{ size: 4, offset: 2 }}>
                                <Row className="form-group">
                                    <Col >
                                        {!this.props.departmentUpdate ? (
                                            <Button
                                                type="submit"
                                                color="primary"
                                            // disabled={this.state.btnDis}
                                            >
                                                Add Department
                                            </Button>
                                        ) : (
                                            <Button
                                                type="submit"
                                                color="primary"
                                            //  disabled={this.state.btnDis}
                                            >
                                                Update Department
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
export default AddDepartment;

