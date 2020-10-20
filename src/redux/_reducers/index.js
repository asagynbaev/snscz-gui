import { combineReducers } from 'redux';
import { categories, categoriesHasErrored, categoriesIsLoading } from './reducer-categories';
import { products, productsIsLoading } from './reducer-products';
import { modalHasChanged } from './reducer-modal';

export default combineReducers({
    categories,
    categoriesHasErrored,
    categoriesIsLoading,

    products,
    productsIsLoading,

    modalHasChanged,
});