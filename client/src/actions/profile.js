import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    DELETE_ACCOUNT,
    GET_PROFILES,
    GET_REPOS
} from './types';
//Get Current User

export const getCurrentProfile = ( ) => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');
        dispatch ({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch ({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
}
//get profile by id
//http://localhost:5000/api/profile/user/5ec3fd9941892833ac9e479f

export const getProfileById = ( userId ) => async dispatch => {
    try {
        
        const res = await axios.get(`/api/profile/user/${userId}`);
        dispatch ({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch ({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
}
//get github repos
//http://localhost:5000/api/profile/github/computerBitches

export const getGithubRepos = ( username ) => async dispatch => {
    try {
        
        const res = await axios.get(`/api/profile/github/${username}`);
        dispatch ({
            type: GET_REPOS,
            payload: res.data
        });
    } catch (err) {
        dispatch ({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
}
// get all profiles
//http://localhost:5000/api/profile


export const getAllProfiles = ( ) => async dispatch => {

    dispatch( { type: CLEAR_PROFILE });
    try {  
        const res = await axios.get('/api/profile');
        console.log(res.data);
        dispatch ({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (err) {
        dispatch ({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
}

    export const createProfile = (formData, history, edit = false) => async dispatch => {
      
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        } 
        try {
            const res = await axios.post('/api/profile', JSON.stringify(formData), config);
            dispatch ({
                type: GET_PROFILE,
                payload: res.data
            });
            dispatch ( setAlert (edit ? 'Profile Updated' : 'Profile Created'), 'success');
            if (!edit) {
               history.back('/dashboard');
               // this the the way we redirecct in actions unlike component action has its own ways to redirect
            }
        } catch (err) {
            console.log(err);
            const errors = err.response.data.errors;
            if(errors)
            {
                errors.forEach(error => dispatch( setAlert(error.msg, 'danger' )));
            }
            dispatch ({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status}
            });
    }
    }
    //add experience
    export const addExperience = (ExperienceData, history) => async dispatch => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        } 
        try {
            const res = await axios.put('/api/profile/experience', JSON.stringify(ExperienceData), config);
            dispatch ({
                type: GET_PROFILE,
                payload: res.data
            });
            dispatch ( setAlert ('Experience Successfully added!!', 'success'));
          //  history.back('/dashboard');
            
        } catch (err) {
            console.log(err);
            const errors = err.response.data.errors;
            if(errors)
            {
                errors.forEach(error => dispatch( setAlert(error.msg, 'danger' )));
            }
            dispatch ({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status}
            });
    }
    }
    //add educcation
    export const addEducation = (EducationData, history) => async dispatch => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        } 
        try {
            const res = await axios.put('/api/profile/education', JSON.stringify(EducationData), config);
            dispatch ({
                type: GET_PROFILE,
                payload: res.data
            });
            dispatch ( setAlert ('Education Successfully added!!', 'success'));
            
        } catch (err) {
            const errors = err.response.data.errors;
            if(errors)
            {
                errors.forEach(error => dispatch( setAlert(error.msg, 'danger' )));
            }
            dispatch ({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status}
            });
    }
    }

// delete experience
//http://localhost:5000/api/profile/experience/5ec40e23bfc48d32787f09fe

    export const deleteExperience = (experienceId) => async dispatch => {
        try {
            const res = await axios.delete(`/api/profile/experience/${experienceId}`);
            dispatch ({
                type: GET_PROFILE,
                payload: res.data
            });
            dispatch ( setAlert ('Experience Successfully deleted!!', 'delete'));
            
        } catch (err) {
            const errors = err.response.data.errors;
            if(errors)
            {
                errors.forEach(error => dispatch( setAlert(error.msg, 'danger' )));
            }
            dispatch ({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status}
            });
    }
    }

    // delete experience
    //http://localhost:5000/api/profile/education/5ec4123dad3af01d20b6619f

        export const deleteEducation = (educationId) => async dispatch => {
        
            try {
                const res = await axios.delete(`/api/profile/education/${educationId}`);
                dispatch ({
                    type: GET_PROFILE,
                    payload: res.data
                });
                dispatch ( setAlert ('Educaiton Successfully deleted!!', 'delete'));
                
            } catch (err) {
                const errors = err.response.data.errors;
                if(errors)
                {
                    errors.forEach(error => dispatch( setAlert(error.msg, 'danger' )));
                }
                dispatch ({
                    type: PROFILE_ERROR,
                    payload: { msg: err.response.statusText, status: err.response.status}
                });
        }
        }

//delete account & profile
export const deleteAccount = () => async dispatch => {
     if(window.confirm('Are you sure?? This can not be undone !')) {
 
    try {
        const res = await axios.delete('/api/profile');
        dispatch( { type: CLEAR_PROFILE});
        dispatch( { type: DELETE_ACCOUNT});
        dispatch ( setAlert ('Your account has been permanently deleted!!', 'danger'));
        
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors)
        {
            errors.forEach(error => dispatch( setAlert(error.msg, 'danger' )));
        }
        dispatch ({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
}
}
}