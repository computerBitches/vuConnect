import React, { useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile'
import { Link } from 'react-router-dom'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGitHub from './ProfileGithub'

const Profile = ({ 
    getProfileById,
    profile: { profile, loading},
    auth,
    match
    }) => {
    useEffect(() => {
        getProfileById(match.params.id); 
    }, [getProfileById, match.params.id]);

    return (
        
       <Fragment>
           {
            loading ? <Spinner/> : profile === null ? (<h4> Sorry, No such profile exists!! </h4>)
            : (
            <Fragment>
            <Link to="/profiles" className=" btn btn-light">Back To Proifles</Link>
               { auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && 
                ( <Link to='/edit-profile' className='btn btn-dark'> Edit Profile</Link>)
               }
                <ProfileTop profile={ profile }/>
                <ProfileAbout profile={ profile }/>
                <div class="profile-exp bg-white p-2">
                <h2 class="text-primary">Experience</h2>
                { 
                    profile.experience.length > 0 ? (<Fragment>
                        {
                            profile.experience.map( experience => (
                                <ProfileExperience
                                key = { experience._id}
                                experience = { experience } 
                                />
                            ))
                        }
                </Fragment>) : (<h4> No experience credentials !! </h4>) }
                </div>
                <div className ="profile-edu bg-white p-2">
                    <h2 class="text-primary">Education</h2>
                    {
                        profile.education.length > 0 ? (
                            <Fragment>
                                {
                                    profile.education.map ( education => (
                                        <ProfileEducation key = { education._id} education = { education} />
                                    ))
                                }
                            </Fragment> 
                        ) : <h4> No Education to display !! </h4>
                    }
                </div>
                    {
                        profile.githubusername && (
                            <ProfileGitHub username = { profile.githubusername } />
                        )
                    }
                </Fragment>)
              }
       </Fragment>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
 profile: state.profile,
 auth: state.auth
});

export default connect(mapStateToProps, {getProfileById}) (Profile)
