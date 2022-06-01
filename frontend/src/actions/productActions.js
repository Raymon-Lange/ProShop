import axios from 'axios'
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCESS, PRODUCT_LIST_FAIL } from "../constants/productConstants"
import { PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCESS, PRODUCT_DETAILS_FAIL } from "../constants/productConstants"

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST})

        const {data} = await axios.get('/api/products')

        dispatch({type: PRODUCT_LIST_SUCESS, payload: data})
    } catch (error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload : error.response && error.response.data.message 
            ? error.response.data.message : error.message,})
    }
}

export const listProductDetails = (productId) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/products/${productId}`)

        dispatch({type: PRODUCT_DETAILS_SUCESS, payload: data})
    } catch (error) {
        dispatch({type: PRODUCT_DETAILS_FAIL, payload : error.response && error.response.data.message 
            ? error.response.data.message : error.message,})
    }
}