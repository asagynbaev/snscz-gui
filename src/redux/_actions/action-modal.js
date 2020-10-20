import { MODAL_HAS_CHANGED } from './action-types';

export function modalHasChanged(modalData) {
    return {
        type: MODAL_HAS_CHANGED,
        modalData
    };
}
