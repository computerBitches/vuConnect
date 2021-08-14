import React, { Fragment } from 'react'
import Moment from 'react-moment'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteExperience } from '../../actions/profile';

const Experience = ({ experience, deleteExperience }) => {

    const experiences = experience.map( exp => (
                    <tr key= {exp._id}>
                        <td>{ exp.company}</td>
                        <td class="hide-sm">{ exp.title }</td>
                        <td>
                        
                                <Moment format='YYYY/MM/DD'> 
                                    {exp.from} 
                                </Moment> - {' '}
                                {
                                    exp.to === null ? ('Now')
                                    : (
                                    <Moment format='YYYY/MM/DD'> 
                                        {exp.to} 
                                    </Moment>  
                                    )
                                } 
                        </td>
                        <td>
                            <button class="btn btn-danger" onClick = {(_id) => { deleteExperience(_id)}} >
                                Delete
                            </button>
                        </td>
                    </tr>
                    
                ));
    return (
            <Fragment>
               <h2 class="my-2">Experience Credentials</h2>
                <table class="table">
                    <thead>
                    <tr>
                        <th>Company</th>
                        <th class="hide-sm">Title</th>
                        <th class="hide-sm">Years</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        { experiences }
                    </tbody>
                </table>
        </Fragment>
    )
}
Experience.propTypes ={
    deleteExperience: PropTypes.func.isRequired
}
export default connect( null, { deleteExperience }) (Experience);
