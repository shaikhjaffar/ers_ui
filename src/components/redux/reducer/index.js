import {combineReducers} from "redux";
import { profileReducer } from "./profile";
import { DataReducer } from "./getAllData";

const rootred = combineReducers({
    profileReducer,
    DataReducer
});


export default rootred