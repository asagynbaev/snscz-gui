import {
    ADD_PRODUCTS,
    PRODUCTS_HAS_ERRORED,
    PRODUCTS_IS_LOADING,
    GET_PRODUCTS_SUCCESS,
    DELETE_PRODUCTS
  } from '../_actions/action-types';

export function products(state = [], action) {
    switch (action.type) {
        case GET_PRODUCTS_SUCCESS:
            return action.products;
        case ADD_PRODUCTS:
            return [
                ...state,
                Object.assign({}, action.payload)
              ];
        case DELETE_PRODUCTS: 
            return state.filter((shift)=>shift.id !== action.shift);
        case PRODUCTS_HAS_ERRORED:
            return action.hasErrored;
        default:
            return state;
    }
}

export function productsIsLoading(state = false, action) {
    switch (action.type) {
        case PRODUCTS_IS_LOADING:
            return action.isLoading;

        default:
            return state;
    }
}

