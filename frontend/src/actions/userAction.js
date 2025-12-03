import {LOGIN_REQUEST,LOGIN_FAIL,LOGIN_SUCCESS,CLEAR_ERRORS,REGISTER_USER_REQUEST,REGISTER_USER_FAIL,REGISTER_USER_SUCCESS,LOAD_USER_REQUEST,LOAD_USER_SUCCESS,LOAD_USER_FAIL,LOGOUT_SUCCESS,LOGOUT_FAIL,UPDATE_PROFILE_REQUEST,UPDATE_PROFILE_SUCCESS,UPDATE_PROFILE_RESET,UPDATE_PROFILE_FAIL} from "../constants/userConstants";
import axios from "axios";

export const login = (email,password) => async (dispatch) =>{
    try{
        dispatch({type:LOGIN_REQUEST});
        const res = await fetch(`/api/v1/signup/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message || "Login failed");
        }
        dispatch({type:LOGIN_SUCCESS,payload:data.user});
    } catch(error){
        dispatch({type:LOGIN_FAIL,payload:error.message||"Login failed"});
    }
};

export const register = (userData) => async (dispatch) =>{
    try{
        dispatch({type:REGISTER_USER_REQUEST});
        const res = await fetch(`/api/v1/signup/register`, {
            method: "POST",
            body: userData
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Registration failed");
        }

        dispatch({type:REGISTER_USER_SUCCESS,payload:data.user});
    } catch(error){
        dispatch({type:REGISTER_USER_FAIL,payload:error.message||"something is wrong"});
    }
};

export const loadUser = () => async (dispatch) =>{
    try{
        dispatch({type:LOAD_USER_REQUEST});
        const res = await fetch(`/api/v1/signup/me`, {
            method: "GET",
            credentials: "include"
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Failed to load user");
        }
        dispatch({type:LOAD_USER_SUCCESS,payload:data.user});
    } catch(error){
        dispatch({type:LOAD_USER_FAIL,payload:error.message || "Failed to load user"});
    }
};
export const logout = () => async (dispatch) =>{
    try{
        const res = await fetch(`/api/v1/signup/logout`, {
            method: "GET",
            credentials: "include"  
        });

        const data = await res.json();

        if (!res.ok) {
            return dispatch({
                type: LOGOUT_FAIL,
                payload: data.message || "Logout failed",
            });
        }
        dispatch({type:LOGOUT_SUCCESS});
    } catch(error){
        dispatch({type:LOGOUT_FAIL,payload:error.message||"something went wrong"});
    }
};

export const updateProfile = (userData) => async (dispatch) =>{
    try{
        dispatch({ type: UPDATE_PROFILE_REQUEST });

        const res = await fetch(`/api/v1/signup/me/update`, {
            method: "PUT",
            body: userData,
            credentials: "include"
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Failed to update profile");
        }
        dispatch({type:UPDATE_PROFILE_SUCCESS,payload:data.user});
    } catch(error){
        dispatch({type:UPDATE_PROFILE_FAIL,payload:error.message||"something is wrong"});
    }
};


//Clearing Errors
export const clearErrors = () => async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
};

