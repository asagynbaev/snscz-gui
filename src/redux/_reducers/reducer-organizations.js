import {
    ORGANIZATIONS_HAS_ERRORED, 
    ORGANIZATIONS_IS_LOADING, 
    GET_ORGANIZATIONS,
    ADD_ORGANIZATION,
    EDIT_ORGANIZATION,
} from '../_actions/action-types'

export function organizationsHasErrored(state = [], action) {
    switch (action.type) {
        case ORGANIZATIONS_HAS_ERRORED:
            return action.hasErrored;
        default:
            return state;
    }
}

export function organizationsIsLoading(state = false, action) {
    switch (action.type) {
        case ORGANIZATIONS_IS_LOADING:
            return action.isLoading;
        default:
            return state;
    }
}

export function organizations(state = [], action) {
    switch (action.type) {
        case GET_ORGANIZATIONS:
            return action.organizations;
        case ADD_ORGANIZATION:
            return [
                ...state,
                Object.assign({}, action.payload)
              ];
        case EDIT_ORGANIZATION:
            return state.map((item, index) => {
                if(item.id === action.data.id) {
                    return {
                        ...item,
                        name: action.data.name,
                        phone: action.data.phone,
                        dressCode: action.data.dressCode,
                        address: action.data.address,
                        categoryId: action.data.categoryId
                    }
                }
                return item;
                })
        default:
            return state;
    }
}