
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
import { Loading } from "../LoadingComponent";
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
        if (this.props.isLoading)
            return <Loading />
        else if (this.props.errMess)
            return <h3 style={{ color: 'red' }}>{this.props.errMess}</h3>
        else
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
                <Card className="crdFrame">
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
                                                isAdded: (cname) => !this.props.companies.some((company) =>
                                                    company.comp_name.toLowerCase().trim() === cname.toLowerCase().trim())

                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model="fCompany.comp_name"
                                            show="touched"
                                            messages={{
                                                required: requiredErr,
                                                isAdded: 'Sorry, Company already added'
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </Col>


                            <Col md={{ size: 4, offset: 2 }}>
                                <Row className="form-group">
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

