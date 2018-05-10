import RootNavigation from './../../nav/RootNavigation';
const initialState = RootNavigation.router.getStateForAction(RootNavigation.router.getActionForPathAndParams('Splash'));
const navReducer = (state = initialState, action) => {
    const nextState = RootNavigation.router.getStateForAction(action, state);
    return nextState || state;
};
export default navReducer;