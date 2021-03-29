/**
 * Navbar Component
 * Component that you see as a header at the top
 */
import React from 'react';
import { Navbar} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { NavLink , Link } from 'react-router-dom';
import '../index.css';

const CustomNavbar = () => {

const guestLinks =(
    <React.Fragment>
        <NavLink activeStyle = {{color : "white"}} style={{ color: "white" }} activeClassName="chosen" className="nav-link" to="/home">HOME</NavLink>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <NavLink activeStyle = {{color : "white"}} style={{ color: "white" }} activeClassName="chosen" className="nav-link " to="/policyGraph">GRAPH</NavLink>
    </React.Fragment>
);        
   return (
        <React.Fragment>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Link to="/home">
                    <Navbar.Brand >PolicyReco</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto navbar-list">
                        {guestLinks}
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
        </React.Fragment>
    );
}
export default CustomNavbar;