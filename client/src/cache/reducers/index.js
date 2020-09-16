import workOrderData from './workOrderData';
import userInfo from './userInfo';
import {combineReducers} from 'redux';
const allReducers = combineReducers({
    orderReducer: workOrderData,
    userReducer: userInfo
});

const rootReducer = (state, action) => {
    if(action.type === 'USER_LOGOUT') {
        localStorage.clear();
        state = undefined;
    }

    return allReducers(state, action);
};

export default rootReducer;