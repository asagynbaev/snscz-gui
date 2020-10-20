import {
    CATERING_HAS_ERRORED, 
    CATERING_IS_LOADING, 
    GET_CATERING
} from '../_actions/action-types'

export function cateringHasErrored(state = [], action) {
    switch (action.type) {
        case CATERING_HAS_ERRORED:
            return action.hasErrored;
        default:
            return state;
    }
}

export function cateringIsLoading(state = false, action) {
    switch (action.type) {
        case CATERING_IS_LOADING:
            return action.isLoading;
        default:
            return state;
    }
}

export function catering(state = [], action) {
    switch (action.type) {
        case GET_CATERING:
            return action.catering;
        // case ADD_ORGANIZATION:
        //     return [
        //         ...state,
        //         Object.assign({}, action.payload)
        //       ];
        // case EDIT_ORGANIZATION:
        //     return state.map((item, index) => {
        //         if(item.id === action.data.id) {
        //             return {
        //                 ...item,
        //                 name: action.data.name,
        //                 phone: action.data.phone,
        //                 dressCode: action.data.dressCode,
        //                 address: action.data.address,
        //                 categoryId: action.data.categoryId
        //             }
        //         }
        //         return item;
        //         })
        default:
            return state;
    }
}