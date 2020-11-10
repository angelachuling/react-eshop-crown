import {UserActioinTypes} from './user.types';

const INITIAL_STATE = {
    currenUser: null
}
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActioinTypes.SET_CURRENT_USER:
            //return an object
            return {
                ...state,
                currentUser: action.payload
            }

        default:
            return state;
    }
}

export default userReducer;