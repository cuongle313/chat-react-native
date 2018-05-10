import { createStore, applyMiddleware } from 'redux'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import createSagaMiddleware from 'redux-saga'

import rootSaga from './sagas'
import reducers from './reducers'
import firebase from './firebase/firebase'

const sagaMiddleware = createSagaMiddleware();
const navMiddleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
);

const middleware = [
    sagaMiddleware, 
    navMiddleware
]
const store = createStore(
    reducers,
    applyMiddleware(...middleware)
)
sagaMiddleware.run(rootSaga);

firebase(store);
export default store;