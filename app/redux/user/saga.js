import { put, select, call, take } from 'redux-saga/effects';
import firebase from 'react-native-firebase';
import * as actions from './action';
import * as consts from './../const';
import { NavigationActions } from "react-navigation";
const db = firebase.database();
export const saveUser = function* (action) {
    try {
        const me = yield select(state => state.user.me)
        if (me) {
            let db_me = yield db.ref('/users/' + me.uid).once('value');
            db_me = db_me.val();
            db.ref('users/' + me.uid).set({
                phoneNumber: me.phoneNumber,
                uid: me.uid,
                ...action.data
            });
        }
    } catch (error) {

    }
}

export const loginSuccess = function* (action) {
    try {
        const me = yield select(state => state.user.me)
        if (me) {
            let db_me = yield db.ref('/users/' + me.uid).once('value');
            db_me = db_me.val();
            if (!db_me) { //user mới
                createdUser = yield db.ref('users/' + me.uid).set({
                    phoneNumber: me.phoneNumber,
                    uid: me.uid
                });
                db_me = yield db.ref('/users/' + me.uid).once('value');
                db_me = db_me.val();
            }
            yield put(actions.setCurrentUser(db_me));
        }
        yield put({ type: consts.CHECK_FRIEND_STATUS })
    } catch (error) {

    }
}

export const logout = function* (action) {
    yield put(NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Login' })],
    }))
}

/**check friend flow */

// db = {
//     friendship: {
//         randomID: {
//             phoneNumber1: true,
//             phoneNumber2: true,
//             messages: {
//                 // ...
//             }
//         }
//     }
// }

/**Hàm trả về trạng thái tình bạn của user hiện tại
 * None - là chưa gửi yêu cầu cho ai
 * Waiting - là đang chờ người khác xác nhận
 * +842345233523 - số điện thoại người mình đang kết nối
 */
function* checkFriendStatus() {
    const me = yield select(state => state.user.me);
    const checkWait = yield db.ref("/friendship")
        .orderByChild(me.phoneNumber)
        .equalTo(true)
        .once("value");
    let result = [];
    checkWait.forEach(function (child) {
        result.push({
            path: child.ref.path,
            item: child.val()
        });
    });
    if (result.length == 0) {
        return 'None'
    } else {
        const f = result[0];
        console.log(f);
        for (p in f.item) {
            /**Nếu là số điện thoại */
            if (p.indexOf('+') == 0 && p != me.phoneNumber) {
                return f.item[p] ? {
                    status: 'Ok',
                    phoneNumber: p,
                    path: f.path
                } : {
                        status: 'Waiting',
                        phoneNumber: p,
                        path: f.path
                    }
            }
        }
        return {
            status: 'None'
        };
    }
}

const setFriend = function* (action) {
    const me = yield select(state => state.user.me);

    const checkWaitMe = yield db.ref("/friendship")
        .orderByChild(me.phoneNumber)
        .equalTo(false)
        .once("value");
    let waitMe = null;
    checkWaitMe.forEach(function (child) {
        const val = child.val();
        if (val[action.phoneNumber]) {
            waitMe = {
                path: child.ref.path,
                item: val
            }
        }
    });
    const data = {};
    data[me.phoneNumber] = true;

    if (waitMe) {
        console.log(waitMe);
        const res = yield db.ref(waitMe.path).set({
            ...waitMe.item,
            ...data
        });
        return res;
    } else {
        data[action.phoneNumber] = false;
        const res = yield db.ref('/friendship').push().set(data);
        return res;
    }
}

export const friendCheckFlow = function* () {
    let waitTake = true;
    while (true) {
        if (waitTake)
            yield take([consts.CHECK_FRIEND_STATUS]);
        const fStatus = yield call(checkFriendStatus);
        if (fStatus.status == 'Ok') {
            yield put({ type: consts.SET_CONVERSATION_PATH, path: fStatus.path })
            yield put(NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Main' })],
            }))
        } else {
            yield put(actions.setMyCrush(fStatus.phoneNumber))
            yield put(NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Thinh' })],
            }))
            if (fStatus.phoneNumber) {
                const action = yield take([consts.CANCEL_CURRENT_CRUSH, consts.CURRENT_CRUSH_AGREE_ME]);
                if (action.type == consts.CANCEL_CURRENT_CRUSH) {
                    const remove = yield db.ref(fStatus.path).remove();
                    yield put(actions.setMyCrush(null))
                    fStatus.phoneNumber = null;
                } else {

                }
            }
            if (!fStatus.phoneNumber) {
                /**chưa gửi kết bạn với ai */
                const action = yield take([consts.SET_FRIEND]);
                yield call(setFriend, action);
                waitTake = false;
            }
        }
    }
}

export const uploadAvatar = function* (action) {
    try {
        const me = yield select(state => state.user.me)
        if (me) {
            const file = yield firebase.storage()
                .ref('/avatar/' + me.uid + '.jpg')
                .putFile(action.path);
            me.avatar = file.downloadURL;
        }
        yield put(actions.setCurrentUser(me));
        yield call(saveUser, {})
    } catch (error) {
        console.log(error.message);
    }
}


export const removeFriendShip = function* () {
    console.log('áncasj');
    const action = yield take([consts.REMOVE_FRIEND_SHIP, consts.CHECK_FRIEND_STATUS]);
    const statusFriend = yield call(checkFriendStatus);
    const data = {};    
    const me = yield select(state => state.user.me);
    
    try {
        if((statusFriend.status == true) && (data[me.phoneNumber] == true)){
            // console.log(data[me.phoneNumber]);
            data[me.phoneNumber] == false;
            const res = yield db.ref('/friendship').push().set(data);
            // const remove = yield db.ref(statusFriend.path).remove();
            // yield put([actions.setMyCrush(null), actions.setFriend(null)])
            // statusFriend.phoneNumber = null;
            return res;            
            yield put(NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Thinh' })],
            }))
        }
    } catch (error) {
        
    }
}

