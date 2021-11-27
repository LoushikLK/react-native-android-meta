import { combineReducers } from "redux";
import userLoginReducers from './userLoginReducers'
const reducers = combineReducers({
    userLogin: userLoginReducers,
})

export default reducers;