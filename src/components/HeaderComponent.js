import React, { Component } from "react";
import {
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    NavItem,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    Label,
    Input,
    FormGroup,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    Row,
    Col, Badge
    // Jumbotron,
} from "reactstrap";

import { Link, NavLink } from "react-router-dom";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
        }
        this.toggleNav = this.toggleNav.bind(this);
    }
    //************** */
    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen,
        });
    }
    //************ */
    render() {
        return <Navbar color="dark" light expand="md" >

            <NavbarToggler
                onClick={this.toggleNav}
                style={{ borderColor: 'white', color: 'white', marginBottom: '5px' }}

            />
            <Row>
                <Col md={12}>
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                        <Nav navbar>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret style={{ color: "white" }}>
                                    <i className="fa fa-gears"></i> Master Data
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                        <NavLink className="nav-link" to="addBrand">
                                            Car Brand
                                        </NavLink>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <NavLink className="nav-link" to="addCar">
                                            Cars
                                        </NavLink>
                                    </DropdownItem>

                                    <DropdownItem>
                                        <NavLink className="nav-link" to="addCategory">
                                            Categories
                                        </NavLink>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <NavLink className="nav-link" to="addCompany">
                                            Companies
                                        </NavLink>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <NavLink className="nav-link" to="addDepartment">
                                            Departments
                                        </NavLink>
                                    </DropdownItem>

                                    <DropdownItem>
                                        <NavLink className="nav-link" to="addQuota">

                                            Quota
                                        </NavLink>
                                    </DropdownItem>

                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <NavItem>
                                <NavLink
                                    className="nav-link "
                                    to="addEmployee"
                                    style={{ color: "white" }}
                                >
                                    <span className="fa fa-user  "></span> Add Employees
                                </NavLink>
                               
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className="nav-link "
                                    to="ChangeCar"
                                    style={{ color: "white" }}
                                >
                                    <span className="fa fa-car "></span> Change Car
                                </NavLink>
                               
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret style={{ color: "white" }}>
                                   Employees History
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                        <NavLink className="nav-link" to="Consumption">
                                        Consumptions
                                        </NavLink>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <NavLink className="nav-link" to="CarHistory">
                                        Car History
                                        </NavLink>
                                    </DropdownItem>
                                    </DropdownMenu>
                            </UncontrolledDropdown>

                        </Nav>

                    </Collapse>

                </Col>
            </Row>

        </Navbar>

    }
}
export default Header;


