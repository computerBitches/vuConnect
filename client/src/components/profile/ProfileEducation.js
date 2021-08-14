import React from 'react'
import Moment from 'react-moment'
import PropTypes from 'prop-types'

const ProfileEducation = ({
    education : {
        school,
        current,
        degree,
        fieldofstudy,
        from,
        description
    }
}) => {
    return (
        <div>
             <div>
            <h3>{ school}</h3>
            <p>
                     <Moment format='YYYY/MD/DD'> { from }</Moment> -
                     { 
                        // !to? 'Now' : 
                        // <Moment format='YYYY/MM/DD'>{ to }</Moment>
                    }
            </p>
                <p><strong>Degree: </strong>{ degree }</p>
                <p><strong>Field Of Study: </strong>{ fieldofstudy }</p>
            <p>
              <strong>Description: </strong>{ description }
            </p>
          </div> 
        </div>
    )
}
export default ProfileEducation
