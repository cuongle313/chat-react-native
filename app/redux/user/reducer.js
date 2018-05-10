import * as consts from './../const'
const initialState = {
    me: null,
}

export default (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case consts.LOGIN_SUCCESS:
            return {
                ...state,
                me: action.payload
            };
        case consts.SET_CURRENT_USER:
            return {
                ...state,
                me: action.payload
            };

        case consts.SET_MY_CRUSH: {
            return {
                ...state,
                myCrushPhoneNumber: action.phoneNumber
            }
        }

        default:
            return state
    }
};
