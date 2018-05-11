import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, StyleSheet, FlatList } from 'react-native';
import InputMessage from './../components/InputMessage';
import Message from './../components/Message';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

class ChatView extends Component {
    constructor(props) {
        super(props);
        this.send = this.send.bind(this)
        this.messagesRef = firebase.database().ref(props.path);
    }

    keyExtractor = (item, index) => `${item.createdAt}`;

    renderItem = ({ item }) => (
        <Message message={item.message} />
    );

    send(message) {
        this.messagesRef.push().set({
            sendBy: this.props.me.phoneNumber,
            message,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        style={{ flex: 1 }}
                        data={this.props.messages}
                        extraData={this.props.messages}
                        keyExtractor={this.keyExtractor}
                        renderItem={this.renderItem}
                        onEndReached={() => {
                            console.log('onEndReached')
                        }}
                        onEndReachedThreshold={0.5}
                        inverted={true}
                    />
                </View>
                <InputMessage send={this.send} />
            </View>
        );
    }
}

export default connect(state => {
    return {
        path: state.conversation.path,
        messages: state.conversation.messages,
        me: state.user.me
    }
})(ChatView)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})