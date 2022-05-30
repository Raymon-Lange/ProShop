import { PRODUCT_LIST_FAIL, PRODUCT_LIST_SUCESS, PRODUCT_LIST_FAIL } from "../constants/productConstants"

export const productListReducer = (state = {proucts: []}, action ) => {
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading: true, products: [] }
        case PRODUCT_LIST_SUCESS:
            return { loading: false, prodcuts: action.payload}
        case PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }

}