import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    View, Text, TextInput,
    KeyboardAvoidingView,
    Animated, Keyboard,
    StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import * as variables from './../styles/variables';

// import Emoticons from 'react-native-emoticons';

export default class InputMessage extends PureComponent {
    constructor(props) {
        super(props);
        this.keyboardHeight = new Animated.Value(0);
        this.onChangeText = this.onChangeText.bind(this);
        this.send = this.send.bind(this);
    }

    state = {
        text: '',
        image: null,
        images: null,
        selectedEmoji: null,
        showPicker: false,
    }

    componentDidMount = () => {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    };

    componentWillUnmount() {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
    }

    keyboardWillShow = (event) => {
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: event.endCoordinates.height,
            })
        ]).start();
    };

    keyboardWillHide = (event) => {
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: 0,
            })
        ]).start();
    };



    static propTypes = {
        send: PropTypes.func.isRequired,
    }

    onChangeText(text) {
        this.setState({ text })
    }

    send() {
        const { text } = this.state;
        if (text.trim() == "") return;
        this.setState({ text: '' }, () => {
            this.props.send && this.props.send(text);
        })
    }

    sendImage() {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true,
            includeExif: true,
          }).then(image => {
            console.log('received base64 image');
            this.setState({
              image: {uri: `data:${image.mime};base64,`+ image.data, width: image.width, height: image.height},
              images: null
            });
            this.props.send(image);
          }).catch(e => alert(e));  
    }

    render() {
        return (
            <Animated.View style={[styles.container, { paddingBottom: this.keyboardHeight }]}>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} autoGrow multiline maxHeight={70} underlineColorAndroid="transparent" placeholder="Soạn tin nhắn..." placeholderTextColor={variables.borderColor}
                        value={this.state.text}
                        onChangeText={this.onChangeText} />
                    <Icon name="sentiment-satisfied" size={20} color={variables.btSendColor} style={styles.sendIcon} onPress={this.state.selectedEmoji} />
                    <Icon name="image" size={20} color={variables.btSendColor} style={styles.sendIcon} onPress={this.sendImage} />
                    <Icon name="send" size={20} color={variables.btSendColor} style={styles.sendIcon} onPress={this.send} />
                </View>
                
            </Animated.View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        width: "100%"
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopColor: variables.iconProfile,
        borderTopWidth: 1,
    },
    sendIcon: {
        padding: 8,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        padding: 8,
    }
})