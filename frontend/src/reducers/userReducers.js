import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from '../constants/usersContants'
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