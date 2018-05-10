import firebase from 'react-native-firebase';
firebase.database().goOnline();
import * as actions from './action';
import * as consts from './../const';

class FirebaseWatch {
    constructor(store) {
        this.store = store;
        this.addMessage = this.addMessage.bind(this);
        this.listenAuth();
        this.listenChangeMessagesRef();
    }

    listenAuth() {
        firebase.auth().onAuthStateChanged((user) => {
            this.store.dispatch(actions.onAuthStateChanged(user == undefined ? undefined : user.toJSON()))
        })
    }

    listenMessages() {
        if(this.messagePath) {
            firebase.database().ref(this.messagePath).limitToLast(1).on('child_added', this.addMessage);
        }
    }

    removeListenMessages() {
        if(this.messagePath) {
            firebase.database().ref(this.messagePath).off();
        }
    }

    listenChangeMessagesRef() {
        this.store.subscribe(() => {
            const newPath = this.store.getState().conversation.path;
            if (this.messagePath != newPath) {
                this.removeListenMessages();
                this.messagePath = newPath;                
                this.listenMessages();
            }
        })
    }

    addMessage(data) {
        this.store.dispatch({
            type: consts.RECEIVE_MESSAGE,
            data: data.val()
        })
    }

}

export default (store) => {
    return new FirebaseWatch(store);
}