

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
class AddCategory extends Component {
    constructor(props) {
        super(props);

    }
    handleSubmit(values) {

        const currentItem = {
            cat_name: values.cat_name,
        }
        if (this.props.categoryUpdate)
            this.props.putCategory(this.props.categoryUpdate.cat_name, currentItem)
        else
            this.props.postCategories(currentItem)
        this.props.resetCategoryForm()
    }

    render() {
        var cat_name = '';
        if (this.props.categoryUpdate) {
            cat_name = this.props.categoryUpdate.cat_name;
        }
        return <div className="container" style={{ marginTop: '2px' }} >
            <Breadcrumb className="breadcrumb">
                <BreadcrumbItem className="breadcrumb-item" active>
                    Add Employee Category
                </BreadcrumbItem>
                <BreadcrumbItem className="breadcrumb-item">
                    <Link className="link" to="/">
                        View Employees' Categories
                    </Link>
                </BreadcrumbItem>
            </Breadcrumb>
            <Card className="crdFrame">
                <Form
                    model="fCategory"
                    onSubmit={(values) => this.handleSubmit(values)}
                >
                    <Row>


                        <Col md={6}>
                            <Row className="form-group">
                                <Label htmlFor="cat_name" md={4}>
                                    Employee Category:
                                </Label>
                                <Col md={8}>
                                    <Control.text
                                        model="fCategory.cat_name"
                                        id="cat_name"
                                        name="cat_name"
                                        defaultValue={cat_name}
                                        className="form-control"
                                        validators={{
                                            required,

                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model="fCategory.cat_name"
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
                                    {!this.props.categoryUpdate ? (
                                        <Button
                                            type="submit"
                                            color="primary"
                                        // disabled={this.state.btnDis}
                                        >
                                            Add Category
                                        </Button>
                                    ) : (
                                        <Button
                                            type="submit"
                                            color="primary"
                                        //  disabled={this.state.btnDis}
                                        >
                                            Update Category
                                        </Button>
                                    )}
                                    &nbsp; &nbsp;
                                    <Button color="danger" onClick={() => this.props.resetCategoryForm()} >
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
export default AddCategory;

