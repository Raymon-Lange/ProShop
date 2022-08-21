import { USER_DETAILS_RESET, USER_DETAIL_FAIL , USER_DETAIL_REQUEST, USER_DETAIL_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from '../constants/usersContants'
import { USER_REG_FAIL, USER_REG_REQUEST, USER_REG_SUCCESS } from "../constants/usersContants"

export const userLoginReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true}
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const userRegisterReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case USER_REG_REQUEST:
            return { loading: true}
        case USER_REG_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_REG_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const userUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { loading: true}
        case USER_UPDATE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userDetailReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAIL_REQUEST:
            return {...state,  loading: true}
        case USER_DETAIL_SUCCESS:
            return { loading: false, user: action.payload }
        case USER_DETAIL_FAIL:
            return { loading: false, error: action.payload }
        case USER_DETAILS_RESET:
            return {user: {}}
        default:
            return state
    }
}

export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return {...state,  loading: true}
        case USER_LIST_SUCCESS:
            return { loading: false, users: action.payload }
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userDeleteReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return {...state,  loading: true}
        case USER_DETAIL_SUCCESS:
            return { loading: false, users: action.payload }
        case USER_DETAIL_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}