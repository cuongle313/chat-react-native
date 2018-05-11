import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-datepicker';
import dateformat from 'dateformat'


import { UserBox } from './../redux/user/map';

class ProfileView extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.changeAvatar = this.changeAvatar.bind(this);
        this.renderUser = this.renderUser.bind(this);
    }
    changeAvatar() {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            cropperToolbarTitle: 'Căn chỉnh ảnh'
        }).then(image => {
            this.setState({
                avatar: image.path
            })
            this.userActions.uploadAvatar(image.path);
        }).catch(e => {
            console.log(e);
        });
    }

    renderUser(props) {
        this.userActions = props;
        console.log(props)
        return (
            <View style={styles.avatarContainer}>
                <Avatar
                    xlarge
                    rounded
                    source={{ uri: props.user.me.avatar ? props.user.me.avatar : "" }}
                    onPress={this.changeAvatar}
                    activeOpacity={0.7}
                />
                <Text style={styles.name}>Lê Văn Cường</Text>

                <DatePicker
                    style={{ width: 200 }}
                    date={props.user.me.birthday ? dateformat(props.user.me.birthday, 'dd-mm-yyyy') : null}
                    mode="date"
                    placeholder="Ngày sinh..."
                    format="DD-MM-YYYY"
                    maxDate="01-01-2013"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    showIcon={false}
                    androidMode="spinner"
                    customStyles={{
                        dateInput: {
                            borderWidth: 0,
                        }
                    }}
                    onDateChange={(date) => {
                        const ds = date.split('-');
                        this.userActions.userUpdateProfile({
                            birthday: new Date(ds[2] -  ds[1] -  ds[0]).getTime()
                        })
                        this.userActions.saveUser()

                    }}
                />
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <UserBox render={this.renderUser} />
            </View>
        );
    }
}

export default ProfileView;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    avatarContainer: {
        padding: 8,
        alignItems: 'center',
    },
    name: {
        padding: 8,
        fontWeight: 'bold',
        fontSize: 15,
    }

})