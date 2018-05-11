import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from './action';

const Box = (props) => {
    return props.render(props);
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = dispatch => (bindActionCreators(userActions, dispatch));

export const UserBox = connect(mapStateToProps, mapDispatchToProps)(Box)