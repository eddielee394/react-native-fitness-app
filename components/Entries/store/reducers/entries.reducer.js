import * as Actions from "../actions";

const initialState = {};
/**
 * entries reducer
 * @param state
 * @param action PARAM_1 | PARAM_2 | PARAM_3
 * @return {{}}
 */
const entriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_ENTRIES_SUCCESS:
      return {
        //receive the state
        ...state,
        //merge the action
        ...action.payload
      };
    case Actions.ADD_ENTRY_SUCCESS:
      return {
        //receive the state
        ...state,
        //merge the action
        ...action.payload
      };
    default:
      return state;
  }
};

export default entriesReducer;
