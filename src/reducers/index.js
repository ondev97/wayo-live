import {combineReducers} from 'redux';
import accountDetailsReducer from './acoountDetails';

const rootReducer = combineReducers({
    accountDetails : accountDetailsReducer
})

export default rootReducer;