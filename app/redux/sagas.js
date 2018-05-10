import { fork, takeLatest, takeEvery, all } from 'redux-saga/effects';
import * as consts from './const';
import * as firebaseSagas from './firebase/saga';
import * as userSagas from './user/saga';

const sagas = function* () {
    yield takeEvery(consts.LOGOUT, userSagas.logout);
    yield takeEvery(consts.LOGIN_SUCCESS, userSagas.loginSuccess);
    yield takeEvery(consts.SAVE_USER, firebaseSagas.saveUser);
    // yield takeEvery(consts.SET_FRIEND, userSagas.setFriend);
}

const rootSaga = function* () {
    yield all([
        userSagas.friendCheckFlow(),
        sagas()
    ]);
}

export default rootSaga;