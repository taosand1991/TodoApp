import React, {Fragment, useState} from 'react';
import {Link} from "react-router-dom";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBCollapse,
    MDBNavbarNav, MDBNavItem, MDBNavLink, MDBFormInline
} from 'mdbreact'
import authContext from "../authentication/AuthContext";

function NavbarHeader(props) {
    const [state, setState] = useState({isOpen: false});
    const {user} = React.useContext(authContext)

    const toggleCollapse = () => {
        setState(prevState => ({
            ...prevState,
            isOpen: !state.isOpen
        }))
    };
    return (
        <Fragment>
            <MDBNavbar color="green" dark expand="md">
                <MDBNavbarBrand>
                    <Link to='/todos'><strong className="white-text bold">Todo App</strong></Link>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={toggleCollapse}/>
                <MDBCollapse id="navbarCollapse3" isOpen={state.isOpen} navbar>
                    <MDBNavbarNav right>
                        {!user ? (
                                <MDBNavItem active>
                                    <MDBNavLink to="/login">Login</MDBNavLink>
                                </MDBNavItem>)
                            : (
                                <>
                                    <MDBNavItem>
                                        <MDBNavLink disabled to="#!">Welcome {user.username}</MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem>
                                        <MDBNavLink to="/logout">Logout</MDBNavLink>
                                    </MDBNavItem>
                                </>
                            )
                        }
                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                        <MDBNavItem>
                            <MDBFormInline waves>
                                <div className="md-form my-0">
                                    <input className="form-control mr-sm-2" type="text" placeholder="Search"
                                           aria-label="Search"/>
                                </div>
                            </MDBFormInline>
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        </Fragment>
    );
}

export default NavbarHeader;