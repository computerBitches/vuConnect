import React,{Fragment, useState} from 'react'
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Redirect, Link } from 'react-router-dom';
const Register = ({ setAlert, register, isAuthenticated}) => {
    const [member, setMember] = useState(
                                {
                                    name:'',
                                    email:'',
                                    password:'',
                                    repeat_passoword:''
                                });
    const { name, email, password, repeat_passoword } = member;
    var  changeMemberData = (e) => {
          setMember({...member,[e.target.name]:e.target.value})
      }
    var onFormSubmit = async (e) => {
      e.preventDefault();
      if(password !== repeat_passoword)
     setAlert('The words does not match', 'danger')
      else {
      register ({ name, email, password });
      }
      
    }
if(isAuthenticated)
return <Redirect to="/dashboard" />;

    return (
       <Fragment>
        <section className="container">
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
        <form className="form"  onSubmit={onFormSubmit}>
          <div className="form-group">
            <input type="text" 
                    placeholder="Name" 
                    name="name" required
                    value={name}
                    onChange ={changeMemberData} 
                    />
          </div>
          <div className="form-group">
            <input type="email" 
                    placeholder="Email Address" 
                    name="email" 
                    value={email}
                    onChange ={changeMemberData}
                    />
            <small className="form-text"
              >This site uses Gravatar so if you want a profile image, use a
              Gravatar email</small
            >
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password}
              onChange ={changeMemberData}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="repeat_passoword"
              minLength="6"
              value={repeat_passoword}
              onChange ={changeMemberData}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </section>
      </Fragment> 
    );
};
Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });
  

export default connect(
    mapStateToProps,
    {   setAlert,
        register
    }
    ) (Register);

