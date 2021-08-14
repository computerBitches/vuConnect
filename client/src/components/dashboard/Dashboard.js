import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Education from './Education';
import Experience from './Experience';
import io, { Socket } from 'socket.io-client';
let socket;


const Dashboard = ({
    getCurrentProfile,
    deleteAccount,
    auth: { user },
    profile: {profile , loading}}) => {
    const ENDPOINT = 'http://localhost:5000';
   
    useEffect(()=> {
        socket = io(ENDPOINT);
       // console.log(socket);
        socket.on('notification', notificationString  => {
        console.log(notificationString);
          },[]);   
    },[]);
    
    useEffect(()=> {
    getCurrentProfile();
    },[getCurrentProfile]);
   
    return loading && profile === null ? ( <Spinner/> ):(
         <Fragment>  
               
                <p class="lead">
                    <i className="fas fa-user"></i> {'  '}
                    Welcome, {' '} { user && user.name } 
                </p> 
                    {
                        profile !== null? profile.profile !== undefined && (
                        (
                            <Fragment>  
                                <DashboardActions/> 
                                { profile.profile.experience !== undefined && <Experience experience = {profile.profile.experience}/> }
                                { profile.profile.education !== undefined && <Education education = {profile.profile.education} /> }
                            </Fragment>)
                            ):(
                            <Fragment> 
                                <p>You have not yet set up a profile, please add some info!!</p>
                                <Link to="/create-profile"> Create Profile </Link>
                            </Fragment>
                        )
                    }               
                <div className="my-2">
                    <button className="btn btn-danger" onClick = { () => deleteAccount () }>
                <i className="fa fa-trash-o fa-lg"></i>
              {'   '} Delete My Account
            </button>
          </div>
            </Fragment>
          )       
        };

Dashboard.propTypes ={
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile 
})
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
