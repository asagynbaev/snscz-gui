import { combineReducers } from 'redux';
import { positions, positionsHasErrored, positionsIsLoading } from './reducer-positions';
import { catering, cateringHasErrored, cateringIsLoading } from './reducer-catering';
import { products, productsIsLoading } from './reducer-products';
import { employees, employeesForAutocomplete, employeesHasErrored, employeesIsLoading } from './reducer-employees';
import { modalHasChanged } from './reducer-modal';
import { organizations } from './reducer-organizations';

export default combineReducers({
    positions,
    positionsHasErrored,
    positionsIsLoading,

    products,
    productsIsLoading,

    employees,
    employeesForAutocomplete,
    employeesHasErrored,
    employeesIsLoading,

    modalHasChanged,
    organizations,

    catering,
    cateringHasErrored,
    cateringIsLoading
});