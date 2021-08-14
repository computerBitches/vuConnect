//Reducers specify how the application's state changes in response to actions sent to the store. 
//Remember that actions only describe what happened, but don't describe how the application's state changes.
//The reducer is a pure function that takes the previous state and an action, and returns the next state.

import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
const initialState =[];
export default function( state= initialState, action){
    const { type, payload } = action;
    switch(type){
        case SET_ALERT:
            return [...state, payload]; //copies into state and return new object
        case REMOVE_ALERT:
            return state.filter(alert => alert.id != payload);
        default:
            return state; 
    }
}
//payload:{msg, alert_type, id}

    //...,
    //{ msg, alert_type, id}
