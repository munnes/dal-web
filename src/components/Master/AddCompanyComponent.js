


import React, { Component } from "react";

import {
    Button,
    Row,
    Col,
    Label,
    Breadcrumb,
    BreadcrumbItem,
    Card
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, Form, Errors } from "react-redux-form";
import { required, requiredErr } from "../../shared/constVal";
class AddCompany extends Component {
    constructor(props) {
        super(props);

    }
    handleSubmit(values) {

        const currentItem = {
            comp_name: values.comp_name,
        }
        if (this.props.companyUpdate)
            this.props.putCompany(this.props.companyUpdate.comp_name, currentItem)
        else
            this.props.postCompanies(currentItem)
        this.props.resetCompanyForm()
    }
    
    render() {
        var comp_name = '';
        if (this.props.companyUpdate) {
            comp_name = this.props.companyUpdate.comp_name;
        }
        return <div className="container" style={{ marginTop: '2px' }} >
            <Breadcrumb className="breadcrumb">
                <BreadcrumbItem className="breadcrumb-item" active>
                    Add Employee Company
                </BreadcrumbItem>
                <BreadcrumbItem className="breadcrumb-item">
                    <Link className="link" to="/">
                        View Employees' Companies
                    </Link>
                </BreadcrumbItem>
            </Breadcrumb>
            <Card style={{ padding: "15px 15px 15px 15px" }}>
                <Form
                    model="fCompany"
                    onSubmit={(values) => this.handleSubmit(values)}
                >
                    <Row>
                        <Col md={6}>
                            <Row className="form-group">
                                <Label htmlFor="comp_name" md={4}>
                                    Company:
                                </Label>
                                <Col md={8}>
                                    <Control.text
                                        model="fCompany.comp_name"
                                        id="comp_name"
                                        name="comp_name"
                                        defaultValue={comp_name}
                                        className="form-control"
                                        validators={{
                                            required,

                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model="fCompany.comp_name"
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
                                    {!this.props.companyUpdate ? (
                                        <Button
                                            type="submit"
                                            color="primary"
                                        // disabled={this.state.btnDis}
                                        >
                                            Add Company
                                        </Button>
                                    ) : (
                                        <Button
                                            type="submit"
                                            color="primary"
                                        //  disabled={this.state.btnDis}
                                        >
                                            Update Company
                                        </Button>
                                    )}
                                    &nbsp; &nbsp;
                                    <Button color="danger" onClick={() => this.props.resetCompanyForm()} >
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
export default AddCompany;

