import React, { Fragment, useState } from 'react';
import { createProfile } from '../../../actions/profile';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';


const CreateProfile = ({ createProfile }) => {
    const [profile, setProfile] = useState(
        {
            status:'',
            company:'',
            website:'',
            location:'',
            skills:'',
            githubusername:'',
            bio:'',
            twitter:'',
            facebook:'',
            youtube:'',
            linkedln:'',
            instagram:''

        });
    const [displaySocialNetworks, toggleSocialNetworks] = useState(false);
    const {
      status,
    company,
    website,
    location,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    youtube,
    linkedln,
    instagram } = profile;

    
    var  changeProfileData = (e) => {
        setProfile({...profile,[e.target.name]:e.target.value})
    }
  var onFormSubmit = async (e) => {
    e.preventDefault();
    createProfile(profile, window.history);
  }
    return (
        <Fragment>
           
      <h1 class="large text-primary">
        Create Your Profile
      </h1>
      <p class="lead">
        <i class="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={onFormSubmit}>
        <div class="form-group">
          <select name="status" onChange= {(e) => changeProfileData(e) } value={status}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small class="form-text"
            >Give us an idea of where you are at in your career</small
          >
        </div>
        <div class="form-group">
          <input type="text" 
          placeholder="Company" 
          onChange= {(e) => changeProfileData(e) } 
          value={company}
          name="company" />
          <small class="form-text"
            >Could be your own company or one you work for</small
          >
        </div>
        <div class="form-group">
          <input type="text" 
          placeholder="Website" 
          onChange= {(e) => changeProfileData(e) } 
          value={website}
          name="website" />
          <small class="form-text"
            >Could be your own or a company website</small
          >
        </div>
        <div class="form-group">
          <input type="text" 
          placeholder="Location" 
          onChange= {(e) => changeProfileData(e) } 
          value={location}
          name="location" />
          <small class="form-text"
            >City & state suggested (eg. Boston, MA)</small
          >
        </div>
        <div class="form-group">
          <input type="text" 
          placeholder="* Skills" 
          onChange= {(e) => changeProfileData(e) } 
          value={skills}
          name="skills" />
          <small class="form-text"
            >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small
          >
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="Github Username"
            onChange= {(e) => changeProfileData(e) } 
            value={githubusername}
            name="githubusername"
          />
          <small class="form-text"
            >If you want your latest repos and a Github link, include your
            username</small
          >
        </div>
        <div class="form-group">
          <textarea 
          placeholder="A short bio of yourself" 
          onChange= {(e) => changeProfileData(e) } 
          value={bio}
          name="bio"></textarea>
          <small class="form-text">Tell us a little about yourself</small>
        </div>

        <div class="my-2">
          <button type="button" class="btn btn-light" onClick={()=> toggleSocialNetworks(!displaySocialNetworks)}>
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
    {
       displaySocialNetworks && 
       <Fragment>
          <div class="form-group social-input">
                <i class="fab fa-twitter fa-2x"></i>
                <input type="text" 
                placeholder="Twitter URL" 
                onChange= {(e) => changeProfileData(e) } 
                value={twitter}
                name="twitter" />
            </div>

        <div class="form-group social-input">
                <i class="fab fa-facebook fa-2x"></i>
                <input type="text" 
                placeholder="Facebook URL" 
                name="facebook" 
                onChange= {(e) => changeProfileData(e) } 
                value={facebook}
                />
        </div>

        <div class="form-group social-input">
            <i class="fab fa-youtube fa-2x"></i>
            <input type="text" 
            placeholder="YouTube URL" 
            onChange= {(e) => changeProfileData(e) } 
            value={youtube}
            name="youtube" />
        </div>

        <div class="form-group social-input">
          <i class="fab fa-linkedin fa-2x"></i>
          <input type="text" 
          placeholder="Linkedin URL" 
          onChange= {(e) => changeProfileData(e) } 
          value={linkedln}
          name="linkedln" />
        </div>

        <div class="form-group social-input">
          <i class="fab fa-instagram fa-2x"></i>
          <input type="text" 
          placeholder="Instagram URL"
          onChange= {(e) => changeProfileData(e) } 
          value={instagram} 
          name="instagram" />
        </div>
         
       </Fragment>
   }

        <input type="submit" class="btn btn-primary my-1" />
        <Link class="btn btn-light my-1" href="/dashboard">Go Back</Link>
      </form>
  
    </Fragment>
    )
}

CreateProfile.propTypes = {
createProfile: PropTypes.func.isRequired,
}

export default connect(null, { createProfile }) ( withRouter (CreateProfile))
