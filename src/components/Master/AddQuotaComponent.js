

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
import { required, requiredErr, isNumber, numErr } from "../../shared/constVal";
class AddQuota extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qCategory: 0,
        }
    }
    handleSubmit(values) {

        const currentItem = {
            gallon: values.gallon,
            cat_id: values.cat_id,

        }
        if (this.props.quotaUpdate)
            this.props.putQuota(this.props.quotaUpdate.q_id, currentItem)
        else
            this.props.postQuotas(currentItem)
        this.resetForm()
    }
    resetForm = () => {
        this.props.resetQuotaForm()
        this.setState({ qCategory: 0, })
    }
    render() {
        var gallon = '', cat_id = 0;
        if (this.props.quotaUpdate) {
            gallon = this.props.quotaUpdate.gallon;
            cat_id = this.props.quotaUpdate.cat_id;
        }
        return <div className="container" style={{ marginTop: '2px' }} >
            <Breadcrumb className="breadcrumb">
                <BreadcrumbItem className="breadcrumb-item" active>
                    Add Quota
                </BreadcrumbItem>
                <BreadcrumbItem className="breadcrumb-item">
                    <Link className="link" to="/">
                        View Quotas
                    </Link>
                </BreadcrumbItem>
            </Breadcrumb>
            <Card className="crdFrame">
                <Form
                    model="fQuota"
                    onSubmit={(values) => this.handleSubmit(values)}
                >
                    <Row>
                        <Col md={6}>
                            <Row className="form-group">
                                <Label htmlFor="cat_id" md={4}>
                                    Employees' Category:
                                </Label>
                                <Col md={8}>
                                    <Control.select
                                        model="fQuota.cat_id"
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
                                        model="fQuota.cat_id"
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
                                <Label htmlFor="gallon" md={4}>
                                    Gallon:
                                </Label>
                                <Col md={8}>
                                    <Control.text
                                        model="fQuota.gallon"
                                        id="gallon"
                                        name="gallon"
                                        defaultValue={gallon}
                                        className="form-control"
                                        validators={{
                                            required,
                                            isNumber

                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model="fQuota.gallon"
                                        show="touched"
                                        messages={{
                                            required: requiredErr,
                                            isNumber: numErr

                                        }}
                                    />
                                </Col>
                            </Row>
                        </Col>

                        <Col md={{ size: 4, offset: 2 }}>
                            <Row className="form-group">
                                <Col >
                                    {!this.props.quotaUpdate ? (
                                        <Button
                                            type="submit"
                                            color="primary"
                                        // disabled={this.state.btnDis}
                                        >
                                            Add Quota
                                        </Button>
                                    ) : (
                                        <Button
                                            type="submit"
                                            color="primary"
                                        //  disabled={this.state.btnDis}
                                        >
                                            Update Quota
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
export default AddQuota;

