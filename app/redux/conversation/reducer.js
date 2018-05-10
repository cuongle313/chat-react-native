import * as consts from './../const'
const initialState = {
    path: null,
    messages: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case consts.SET_CONVERSATION_PATH:
            return {
                ...state,
                path: action.path + '/messages'
            };
        case consts.RECEIVE_MESSAGE:
            return {
                ...state,
                messages: [
                    action.data,
                    ...state.messages
                ]
            }

        default:
            return state
    }
};
