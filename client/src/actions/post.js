import axios from 'axios'
import { setAlert } from './alert'
import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    REMOVE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from './types'

export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');
        dispatch ({
            type:GET_POSTS,
            payload: res.data
        });
    }
    catch(err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }


}
//get post
export const getPost = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${id}`);
        dispatch ({
            type:GET_POST,
            payload: res.data
        });
    }
    catch(err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }


}
//add liked
//http://localhost:5000/api/posts/like/5ec4aace1d842438387edff5
export const addLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${id}`);
        dispatch({
            type:UPDATE_LIKES,
            payload: { id, likes:res.data }
        })

    } catch (err){
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

//Remove Like
//http://localhost:5000/api/posts/unlike/5ec4aace1d842438387edff5
export const removeLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${id}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes:res.data }
        })

    } catch (err){
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

// remove post
// http://localhost:5000/api/posts/5ec497b8be2555432465633f

export const removePost = (id, history) => async dispatch => {
    

        const res = await axios.delete(`/api/posts/${id}`);
        dispatch ({
            type:REMOVE_POST,
            payload: {id}
        });
        dispatch ( setAlert ('Post Successfully deleted!!', 'danger'));
   try { }
    catch(err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }


}
//add new post 
export const addPost = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    } 
    try {

    const res = await axios.post('/api/posts/', formData, config);

 
    dispatch ({
        type:ADD_POST,
        payload: res.data
    });
    dispatch ( setAlert ('New Post Created!!', 'success'));
 }
catch(err) {
    dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status}
    })
}
}

//add new comment 
//http://localhost:5000/api/posts/comment/5ec4aace1d842438387edff5
export const addComment = (postId, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    } 
    try {

    const res = await axios.put(`/api/posts/comment/${postId}`, formData, config);
    dispatch ({
        type:ADD_COMMENT,
        payload: res.data
    });
    dispatch ( setAlert ('Comment Added!!', 'success'));
 }
catch(err) {
    dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status}
    })
}
}

//Remove comment 
//http://localhost:5000/api/posts/comment/5ec4aace1d842438387edff5
export const deleteComment = (postId, commentId) => async dispatch => {
    
    try {

    const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    dispatch ({
        type:REMOVE_COMMENT,
        payload: commentId
    });
    dispatch ( setAlert ('Comment Removed!!', 'danger'));
 }
catch(err) {
    dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status}
    })
}
}
