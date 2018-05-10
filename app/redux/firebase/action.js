import * as consts from './../const'
export const onAuthStateChanged = (user) => {
    return user
        ? {
            type: consts.LOGIN_SUCCESS,
            payload: user
        }
        : {
            type: consts.LOGOUT,
            payload: user
        }
}
export const saveUserInfo = (user) => ({
    type: consts.SAVE_USER,
    data: user
})