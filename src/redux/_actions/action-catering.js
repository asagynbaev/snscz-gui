import axios from 'axios';
import { 
    GET_CATERING, 
    CATERING_IS_LOADING, 
    CATERING_HAS_ERRORED
} from './action-types';

export function cateringHasErrored(bool) {
    return {
        type: CATERING_HAS_ERRORED,
        hasErrored: bool
    };
}

export function cateringIsLoading(bool) {
    return {
        type: CATERING_IS_LOADING,
        isLoading: bool
    };
}

// export const addOrganizationSuccess = (data) => ({
//     type: ADD_ORGANIZATION,
//     payload: { ...data }
//   });
  
//   export const addOrganization = (url, data) => {
//     return (dispatch) => {
//       return axios.post(url, data, { headers: { "Content-Type": "application/json" }})
//         .then((response) => {
//             response.data.forEach(function(item) {
//               dispatch(addOrganizationSuccess(item));
//             });
//         })
//         .catch(error => { throw(error); });
//     };
//   }

export function cateringFetchDataSuccess(catering) {
    return {
        type: GET_CATERING,
        catering
    };
}

export function cateringFetchData(url) {
    return (dispatch) => {
        dispatch(cateringIsLoading(true));
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(cateringIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((catering) => dispatch(cateringFetchDataSuccess(catering)))
            .catch(() => dispatch(cateringHasErrored(true)));
    };
}

// export function editOrganizationSuccess(data) {
//     return {type: EDIT_ORGANIZATION, data}
//   }
    
//   export function editOrganization(url, organization) {
//     return function(dispatch) {
//       return axios.put(url, organization, {
//         headers: { "Content-Type": "application/json" }
//         }).then((response) => {
//         dispatch(editOrganizationSuccess(response.data));
//         return;
//       }).catch(error => {
//         throw(error);
//       })
//     }
//   }