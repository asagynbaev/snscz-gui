export function categoriesHasErrored(state = false, action) {
    switch (action.type) {
        case 'CATEGORIES_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function categoriesIsLoading(state = false, action) {
    switch (action.type) {
        case 'CATEGORIES_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function categories(state = [], action) {
    switch (action.type) {
        case 'GET_CATEGORIES_SUCCESS':
            return action.categories;

        default:
            return state;
    }
}