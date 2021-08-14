import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import ProfileItem from './ProfileItem'
import { getAllProfiles } from '../../actions/profile'



const Profiles = ({ getAllProfiles, profile: {profiles, loading }}) => {
    useEffect(() => {
        getAllProfiles();
    }, []);
    return <Fragment>
        { loading ? <Spinner/> :<Fragment>
            <p class="lead">
                <i class="fab fa-connectdevelop"></i> Connect with the fellow victorians, let's bring our small world together!!
            </p>
            <div class="profiles">
                {
                    profiles.length? (
                        profiles.map( profile => (
                        <ProfileItem key = { profile._id} profile = { profile } />
                ))) :   <h2> No Profile Found !! </h2>
                }
            </div>
        </Fragment> } 
    </Fragment>
}

Profiles.propTypes = {
    getAllProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
   profile: state.profile
});

export default connect(mapStateToProps, { getAllProfiles }) (Profiles);
