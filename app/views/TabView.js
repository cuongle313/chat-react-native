import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import * as variables from './../styles/variables';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconFeather from 'react-native-vector-icons/Feather';
import ChatView from './ChatView';
import TimelineView from './TimelineView';
import SettingView from './SettingView';
import { setTimeout } from 'core-js';
import Slider from './Slider';
import ProfileView from './ProfileView';

const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width,
};

const iconSize = 20;
const icons = {
    chat: <IconFeather name="message-circle" size={iconSize} color={variables.invertColor} />,    
    home: <IconFeather name="home" size={iconSize} color={variables.invertColor} />,    
    calendar: <IconFeather name="calendar" size={iconSize} color={variables.invertColor} />,
    notification: <IconFeather name="bell" size={iconSize} color={variables.invertColor} />,
    setting: <IconFeather name="more-horizontal" size={iconSize} color={variables.invertColor} />,
}
const ChatRoute = () => <ChatView />;
const HomeRoute = () => <Slider />;
const CalendarRoute = () => <TimelineView />;
const NotificationRoute = () => <View style={[styles.container, { backgroundColor: '#673ab7' }]} />;
const ProfileRoute = () => <ProfileView/>;

export default class TabView extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        index: 4,
        routes: [
            { key: 'chat', title: 'chat' },
            { key: 'home', title: 'home' },            
            { key: 'calendar', title: 'calendar' },
            { key: 'notification', title: 'notification' },
            { key: 'setting', title: 'setting' },
        ],
    };

    handleIndexChange = index => this.setState({ index });

    renderHeader = props => {
        return (
            <TabBar {...props} style={styles.tabbar}
                renderLabel={(labelProps) => icons[labelProps.route.title]}
            />
        )
    }

    renderScene = SceneMap({
        chat: ChatRoute,
        home: HomeRoute,        
        calendar: CalendarRoute,
        notification: NotificationRoute,
        setting: ProfileRoute,
    });

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.statusBar} />
                <TabViewAnimated
                    navigationState={this.state}
                    renderScene={this.renderScene}
                    renderHeader={this.renderHeader}
                    onIndexChange={this.handleIndexChange}
                    initialLayout={initialLayout}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabbar: {
        backgroundColor: variables.primaryColor,
        paddingVertical: 8,
    },
    statusBar: {
        width: '100%',
        height: getStatusBarHeight(true),
        backgroundColor: variables.darkenPrimaryColor
    }
});