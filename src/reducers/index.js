import {combineReducers} from 'redux';
import authReducer from './authReducer';
import jobsReducer from './jobsReducer';
import {appReducer} from './app';

const reducers = combineReducers({
  authReducer,
  jobsReducer,
  appReducer,
});
export default reducers;
