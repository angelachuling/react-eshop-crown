import {UserActioinTypes} from './user.types';

export const setCurrentUser = user => ({
    type: UserActioinTypes.SET_CURRENT_USER,
    payload: user
})