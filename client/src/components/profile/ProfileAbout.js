import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({ profile: {
    bio,
    skills,
    user: { name }
}}) => {
    return <Fragment>
        <div class="profile-about bg-light p-2">
<h2 class="text-primary">{ name.trim().split(' ')}'s Bio</h2>
          <p>
            { bio }
          </p>
          <div class="line"></div>
          <h2 class="text-primary">Skill Set</h2>
          <div class="skills">
              { skills.map( ( skill, index) => (
                  <div key = { index }class="p-1"><i class="fa fa-check"></i> { skill }</div>
              ))}
{/*            
            <div class="p-1"><i class="fa fa-check"></i> CSS</div>
            <div class="p-1"><i class="fa fa-check"></i> JavaScript</div>
            <div class="p-1"><i class="fa fa-check"></i> Python</div>
            <div class="p-1"><i class="fa fa-check"></i> C#</div> */}
          </div>
        </div>

    </Fragment>
}

ProfileAbout.propTypes = {

}

export default ProfileAbout
