import {combineReducers} from 'redux'
import user from './user/reducer'
import nav from './nav/reducer'
import conversation from './conversation/reducer'

export default combineReducers({
    user,
    nav,
    conversation
})