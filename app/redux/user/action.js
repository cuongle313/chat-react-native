import * as consts from './../const'

/**Sử dụng cập nhật thông tin user */
export const setCurrentUser = (user) => ({
    type: consts.SET_CURRENT_USER,
    payload: user
})


/**Gửi yêu cầu kết bạn với ai đó */
export const setFriend = (phoneNumber) => ({
    type: consts.SET_FRIEND,
    phoneNumber
})

export const setMyCrush = (phoneNumber) => ({
    type: consts.SET_MY_CRUSH,
    phoneNumber
})

export const cancelCurrentCush = () => ({
    type: consts.CANCEL_CURRENT_CRUSH
})

export const removeFriendShip = () => ({
    type: consts.REMOVE_FRIEND_SHIP
})

export const uploadAvatar = (path) => ({
    type: consts.UPLOAD_AVATAR,
    path
})

export const userUpdateProfile = (data) => ({
    type: consts.CLIENT_UPDATE_PROFILE,
    data
})

export const saveUser = () => ({
    type: consts.SAVE_USER
})