import axios from 'axios';
import { 
    GET_ORGANIZATIONS, 
    ORGANIZATIONS_IS_LOADING, 
    ORGANIZATIONS_HAS_ERRORED,
    ADD_ORGANIZATION,
    EDIT_ORGANIZATION
} from './action-types';

export function organizationsHasErrored(bool) {
    return {
        type: ORGANIZATIONS_HAS_ERRORED,
        hasErrored: bool
    };
}

export function organizationsIsLoading(bool) {
    return {
        type: ORGANIZATIONS_IS_LOADING,
        isLoading: bool
    };
}

export const addOrganizationSuccess = (data) => ({
    type: ADD_ORGANIZATION,
    payload: { ...data }
  });
  
  export const addOrganization = (url, data) => {
    return (dispatch) => {
      return axios.post(url, data, { headers: { "Content-Type": "application/json" }})
        .then((response) => {
            response.data.forEach(function(item) {
              dispatch(addOrganizationSuccess(item));
            });
        })
        .catch(error => { throw(error); });
    };
  }

export function organizationsFetchDataSuccess(organizations) {
    return {
        type: GET_ORGANIZATIONS,
        organizations
    };
}

export function organizationsFetchData(url) {
    return (dispatch) => {
        dispatch(organizationsIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(organizationsIsLoading(false));
                
                return response;
            })
            .then((response) => response.json())
            .then((organizations) => dispatch(organizationsFetchDataSuccess(organizations)))
            .catch(() => dispatch(organizationsHasErrored(true)));
    };
}

export function editOrganizationSuccess(data) {
    return {type: EDIT_ORGANIZATION, data}
  }
    
  export function editOrganization(url, organization) {
    return function(dispatch) {
      return axios.put(url, organization, {
        headers: { "Content-Type": "application/json" }
        }).then((response) => {
        dispatch(editOrganizationSuccess(response.data));
        return;
      }).catch(error => {
        throw(error);
      })
    }
  }