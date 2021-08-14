import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';

const Landing = ({isAuthenticated}) => {
  return (
      !isAuthenticated ? 
          <section className="landing">
            <div className="dark-overlay">
              <div className="landing-inner">
                <h1 className="x-large">VU connect</h1>
                <p className="lead">
                  Create a profile and share the queries to get help from
                  fellow victorians.
                </p>
                <div className="buttons">
                  <Link to="/register" className="btn btn-primary">Sign Up</Link>
                  <Link to="/login" className="btn btn-light">Login</Link>
                </div>
              </div>
            </div>
          </section> 
      : <Redirect to="/dashboard" />
  )
}
Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps) (Landing);