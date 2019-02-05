import { combineReducers } from "redux";
import entries from "../../components/Entries/store/reducers";

const createReducer = asyncReducers =>
  combineReducers({
    entries,
    ...asyncReducers
  });

export default createReducer;
