export function categoriesHasErrored(bool) {
    return {
        type: 'CATEGORIES_HAS_ERRORED',
        hasErrored: bool
    };
}

export function categoriesIsLoading(bool) {
    return {
        type: 'CATEGORIES_IS_LOADING',
        isLoading: bool
    };
}

export function categoriesFetchDataSuccess(categories) {
    return {
        type: 'GET_CATEGORIES_SUCCESS',
        categories
    };
}

export function categoriesFetchData(url) {
    return (dispatch) => {
        dispatch(categoriesIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(categoriesIsLoading(false));
                
                return response;
            })
            .then((response) => response.json())
            .then((categories) => dispatch(categoriesFetchDataSuccess(categories)))
            .catch(() => dispatch(categoriesHasErrored(true)));
    };
}