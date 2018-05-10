import React, { Component } from 'react';
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';
import { addNavigationHelpers, NavigationActions } from "react-navigation";
import {connect} from 'react-redux'

import RootNavigation from './nav/RootNavigation'

const addListener = createReduxBoundAddListener("root");

class App extends Component {
    render() {
        return (
            <RootNavigation navigation={addNavigationHelpers({
                dispatch: this.props.dispatch,
                state: this.props.nav,
                addListener,
            })} />
        );
    }
}
const mapStateToProps = (state) => ({
    nav: state.nav
});

export default connect(mapStateToProps)(App);
