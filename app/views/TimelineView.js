import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Button,
    View
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';

export default class TimelineView extends Component {
    constructor(props) {
        super(props)
        this.onPress = this.onPress.bind(this);
    }

    onPress() {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            cropperToolbarTitle: 'Căn chỉnh ảnh'
        }).then(image => {
            console.log(image);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title="add" onPress={this.onPress} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});
