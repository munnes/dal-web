

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
class AddBrand extends Component {
    constructor(props) {
        super(props);

    }
    handleSubmit(values) {

        const currentItem = {
            b_name: values.b_name,
        }
        if (this.props.brandUpdate)
            this.props.putBrand(this.props.brandUpdate.b_name, currentItem)
        else
            this.props.postBrands(currentItem)
        this.props.resetBrandForm()
    }
    render() {
        var b_name = '';
        if (this.props.brandUpdate) {
            b_name = this.props.brandUpdate.b_name;
        }
        if (this.props.isLoading)
            return <Loading />
        else if (this.props.errMess)
            return <h3 style={{ color: 'red' }}>{this.props.errMess}</h3>
        else
            return <div className="container" style={{ marginTop: '2px' }} >
                <Breadcrumb className="breadcrumb">
                    <BreadcrumbItem className="breadcrumb-item" active>
                        Add Brand
                    </BreadcrumbItem>
                    <BreadcrumbItem className="breadcrumb-item">
                        <Link className="link" to="/">
                            View Brands
                        </Link>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Card className="crdFrame">
                    <Form
                        model="fBrand"
                        onSubmit={(values) => this.handleSubmit(values)}
                    >
                        <Row>


                            <Col md={6}>
                                <Row className="form-group">
                                    <Label htmlFor="b_name" md={4}>
                                        Car Brand:
                                    </Label>
                                    <Col md={8}>
                                        <Control.text
                                            model="fBrand.b_name"
                                            id="b_name"
                                            name="b_name"
                                            defaultValue={b_name}
                                            className="form-control"
                                            validators={{
                                                required,
                                                isAdded: (brand) => !this.props.brands.some((b) =>
                                                    b.b_name.toLowerCase() === brand.toLowerCase())
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model="fBrand.b_name"
                                            show="touched"
                                            messages={{
                                                required: requiredErr,
                                                isAdded: 'Sorry, Car brand already added'
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </Col>


                            <Col md={{ size: 4, offset: 2 }}>
                                <Row className="form-group">
                                    <Col >
                                        {!this.props.brandUpdate ? (
                                            <Button
                                                type="submit"
                                                color="primary"
                                            // disabled={this.state.btnDis}
                                            >
                                                Add Brand
                                            </Button>
                                        ) : (
                                            <Button
                                                type="submit"
                                                color="primary"
                                            //  disabled={this.state.btnDis}
                                            >
                                                Update Brand
                                            </Button>
                                        )}
                                        &nbsp; &nbsp;
                                        <Button color="danger" onClick={() => this.props.resetBrandForm()} >
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
export default AddBrand;

