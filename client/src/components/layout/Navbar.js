import React, {Fragment} from 'react';
import {NavLink, Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logout from '../../actions/auth';
const brand = require('../../components/layout/logo_vuconnect.png');
const  Navbar = ({ auth: {isAuthenticated, loading },logout }) => {
console.log(isAuthenticated);

    const authLinks = (
        <ul>
            <li><Link to="/profiles">
             <i className="fa-group"></i>{' '}   
             Classmates 
             </Link>
            </li>
            <li><Link to="/message-box">
             <i className="fa-paper-plane-o"></i>{' '}   
             MessageBox
             </Link>
            </li>
            <li><Link to="/notifications">
             <i className="fas fa-bell-o"></i>{' '}   
             Notifications
             </Link>
            </li>
            <li><Link to="/posts">
             {/* <i className="fas fa-user"></i>{' '}    */}
             Queries
             </Link>
             </li>
            <li>
                <Link to="/dashboard">
            Dashboard
             </Link>
            </li>
            <li><a onClick={logout} href="#!">
             <i className="fas fa-sign-out-alt"></i>{' '}   
             <span className="hide-sm">Logout</span>
             </a>
            </li>
        </ul>
    );
    const guestLinks = (  <ul>
      <li><Link to="/profiles">
             <i className="fas fa-user"></i>{'   '}   
                 My Classmates
             </Link>
            </li>
        <li><NavLink to="/register">Register</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li>
    </ul>);


    return ( 
           
            <nav className="navbar bg-dark">
                 <Link className="navbar-brand" to="/">
                    <img src = { brand } alt="vuconnect_logo" width="12"/>
                </Link>
                {/* <h1>
                    <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
                </h1> */}
                {!loading && (<Fragment>{ isAuthenticated ? authLinks: guestLinks }</Fragment>)}   
            </nav>
        
    )
}
Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired

};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps, {logout}) (Navbar);
  