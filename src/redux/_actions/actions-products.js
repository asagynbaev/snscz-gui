import axios from 'axios';

import { 
    ADD_PRODUCTS, 
    GET_PRODUCTS_SUCCESS, 
    PRODUCTS_HAS_ERRORED, 
    PRODUCTS_IS_LOADING,
    DELETE_PRODUCTS,
} from './action-types';

export function productsHasErrored(bool) {
    return {
        type: PRODUCTS_HAS_ERRORED,
        hasErrored: bool
    };
}

export function productsIsLoading(bool) {
  return {
    type: PRODUCTS_IS_LOADING,
    isLoading: bool
  };
}

export const productsFetchDataSuccess = (data) => {
  return {
    type: GET_PRODUCTS_SUCCESS,
    products: data
  };
}

export const productsFetchData = (url) => {
  return (dispatch) => {
    dispatch(productsIsLoading(true));
    return axios.get(url)
      .then(response => { dispatch(productsFetchDataSuccess(response.data)) })
      .then(dispatch(productsIsLoading(false)))
      .catch(error => { throw(error); });
    };
}

export const addProductsSuccess = (data) => ({
  type: ADD_PRODUCTS,
  payload: { ...data }
});

export const addProducts = (url, data) => {
  return (dispatch) => {
    return axios.post(url, data, { headers: { "Content-Type": "application/json" }})
      .then((response) => {
          response.data.forEach(function(item) {
            dispatch(addProductsSuccess(item));
          });
      })
      .catch(error => { throw(error); });
  };
}

export function deleteProductsSuccess(data) {
    return {type: DELETE_PRODUCTS, data}
  }
  
  export function deleteProducts(shiftId) {
    return function(dispatch) {
      return axios.delete(`https://ceaapi.herokuapp.com/shifts/${shiftId}`).then(() => {
        dispatch(deleteProductsSuccess(shiftId));
        return;
      }).catch(error => {
        throw(error);
      })
  }
}
