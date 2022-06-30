import axios from "axios"
import { ORDER_LIST_RESET } from "../constants/orderConstants"
import { USER_DETAILS_RESET, USER_DETAIL_FAIL, USER_DETAIL_REQUEST, USER_DETAIL_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../constants/usersContants"
import { USER_REG_FAIL, USER_REG_REQUEST, USER_REG_SUCCESS } from "../constants/usersContants"


export const login = (email, password) => async (dispatch ) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        const {data} = await axios.post('/api/users/login', {email, password}, config)

        dispatch({
            type: USER_LOGIN_SUCCESS, 
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({type: USER_LOGIN_FAIL, payload : error.response && error.response.data.message 
            ? error.response.data.message : error.message,})
    }
} 

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({type: USER_LOGOUT})
    dispatch({type: USER_DETAILS_RESET})
    dispatch({type: ORDER_LIST_RESET})
}

export const register = (name, email, password) => async (dispatch ) =>  {
    try {
        dispatch({
            type: USER_REG_REQUEST
        })

        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        const {data} = await axios.post('/api/users', {name, email, password}, config)

        dispatch({
            type: USER_REG_SUCCESS, 
            payload: data
        })
        //so the user doesn't have to log in right after creating an account. 
        dispatch({
            type: USER_LOGIN_SUCCESS, 
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error){
        dispatch({type: USER_REG_FAIL, payload : error.response && error.response.data.message 
            ? error.response.data.message : error.message,})
    }

}

export const updateUserProfile = (users) => async (dispatch , getState ) =>  {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put('/api/users/profile/', users, config)

        dispatch({
            type: USER_UPDATE_SUCCESS, 
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error){
        dispatch({type: USER_UPDATE_FAIL, payload : error.response && error.response.data.message 
            ? error.response.data.message : error.message,})
    }

}

export const userDetail = (id) => async (dispatch, getState ) =>  {
    try {
        dispatch({
            type: USER_DETAIL_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        console.log("success")
        const {data} = await axios.get(`/api/users/${id}`, config)

        dispatch({
            type: USER_DETAIL_SUCCESS, 
            payload: data
        })

    } catch (error){
        dispatch({type: USER_DETAIL_FAIL, payload : error.response && error.response.data.message 
            ? error.response.data.message : error.message,})
    }

}