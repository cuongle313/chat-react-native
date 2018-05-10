import { put, select } from 'redux-saga/effects';
import firebase from 'react-native-firebase'
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
            console.log(db_me);
        }
    } catch (error) {

    }
}