import React,{useState} from 'react';
import { setAlert } from '../../actions/alert';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Redirect, Link } from 'react-router-dom';
const Login = ({ login, isAuthenticated }) => {

   const [memberLogin, setMemberLogin] = useState({email:'',password:''});


  var  changeMemberLoginData = (e) => {
        setMemberLogin({...memberLogin,[e.target.name]:e.target.value})
    }
  var onFormSubmit = (e) => {
    const { email, password } = memberLogin;
    e.preventDefault();
    login({ email, password });
    }
    if(isAuthenticated)
    return <Redirect to="/dashboard" />;
  
    return (
        <section className="container">
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
        <form className="form">
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={memberLogin.email}
              required
              onChange={changeMemberLoginData}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={memberLogin.password}
              onChange={changeMemberLoginData}
            />
          </div>
          <input type="submit" onClick={onFormSubmit}  className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </section>
    )
}
Login.propTypes = {
    setAlert: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {setAlert, login}) (Login);
