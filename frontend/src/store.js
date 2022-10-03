import { createStore, combineReducers, applyMiddleware }  from 'redux'
import  thunk from 'redux-thunk'
import {composeWithDevTools } from 'redux-devtools-extension'
import { productDetailsReducer, productListReducer, productDeleteReducer, productUpdateReducer, productCreateReducer} from './reducers/productReducers'
import {cartReducer} from './reducers/cartReducers'
import { userDeleteReducer, userDetailReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateReducer } from "./reducers/userReducers"
import { orderCreateReducer, getOrderReducer, orderPayReducer, getMyOrdersReducer } from "./reducers/orderReducers"

const reducer = combineReducers({
    productList: productListReducer, 
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productUpdate: productUpdateReducer,
    productCreate: productCreateReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userUpdate: userUpdateReducer,
    userDetail: userDetailReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    orderCreate: orderCreateReducer,
    orderDetail: getOrderReducer,
    orderPay: orderPayReducer,
    orderMyOrders: getMyOrdersReducer,
})

const cartItemfromStorage = localStorage.getItem('cartItems') ? JSON.parse(
    localStorage.getItem('cartItems')) : []

const userInfofromStorage = localStorage.getItem('userInfo') ? JSON.parse(
    localStorage.getItem('userInfo')) : []

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(
    localStorage.getItem('shippingAddress')) : []

const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? JSON.parse(
    localStorage.getItem('paymentMethod')) : []

const initialState = {
    cart: { cartItems: cartItemfromStorage, shippingAddress: shippingAddressFromStorage, paymentMethod: paymentMethodFromStorage},
    userLogin: {userInfo: userInfofromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store


