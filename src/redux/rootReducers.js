import AuthReducer from './reducers/AuthReducer';
import EmployeReducer from './reducers/EmployeReducer';

import { combineReducers } from "redux";
const rootReducers = combineReducers({user:AuthReducer,employe:EmployeReducer});
export default rootReducers;