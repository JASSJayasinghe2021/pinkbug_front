import React, { createContext, useReducer } from "react";
import Cookies from 'js-cookie';

export const Store = createContext();

const initialState = {
    darkMode: Cookies.get('darkMode') === 'ON' ? true : false,
    //userInfo: Cookies.get('ec_edr_userinfo') ? JSON.parse(Cookies.get('ec_edr_userinfo')) : null,
    userInfo:window.sessionStorage.getItem("ec_edr_userinfo") ? JSON.parse(window.sessionStorage.getItem("ec_edr_userinfo")) :null,
    categories: window.sessionStorage.getItem("categories") ? JSON.parse(window.sessionStorage.getItem("categories")) : [],
    locations:window.sessionStorage.getItem("locations") ? JSON.parse(window.sessionStorage.getItem("locations")) : []
   
};
//reducer
function reducer(state, action) {
    switch (action.type) {
        case 'DARK_MODE_ON': {
            return { ...state, darkMode: true }
        }
        case 'DARK_MODE_OFF': {
            return { ...state, darkMode: false }
        }
        case 'USER_LOGIN': {
            return { ...state, userInfo: action.payload }
        }
        case 'USER_LOGOUT': {
            return { ...state, userInfo: null }
        }
        case 'SET_CATEGORIES': {
            return { ...state, categories: action.payload }
        }
        case 'REMOVE_CATEGORIES': {
            return { ...state, categories: [] }
        }
        case 'SET_LOCATIONS': {
            return { ...state, locations: action.payload }
        }
        case 'REMOVE_LOCATIONS': {
            return { ...state, locations: [] }
        }
        default:
            return state
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch }
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}