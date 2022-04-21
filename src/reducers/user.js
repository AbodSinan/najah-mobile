import * as userActions from '../actions/user';

const defaultState = Object.freeze({
    signedIn: false,
    name: null,
    email: null,
    token: null,
    userType: null,
    errors: [],
})

export default function userReducer(state=defaultState, action) {
    switch (action.type) {
        case "LOGIN": {
            return Object.freeze({
                ...state,
                token: action.token,
                signedIn: true,
            })
        }
        case userActions.SET_USER_TYPE: {
            return Object.freeze({
                ...state,
                userType: action.userType,
            })
        }
        default:
            return state;
    };

}