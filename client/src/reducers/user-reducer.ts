import { FETCH_USER, UserTypes } from '../utils/types';

// Reducer for the users
export default function(state = {}, action: UserTypes) {
    switch (action.type) {
        case FETCH_USER:
            return state;
        default:
            return state;
    }
}
