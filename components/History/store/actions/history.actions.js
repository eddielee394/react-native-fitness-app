import Api from "../../../../utils/Api";
import * as EntryActions from "../../../../components/Entries/store/actions";

export const getCalendarResults = () => dispatch => {
  const request = Api.fetchCalendarResults();

  request
    .then(response => {
      console.log("getCalendarResults", response);
      dispatch({
        type: response.data,
        payload: response.data
      });
    })
    .then(response => {
      return dispatch(EntryActions.getEntries(response));
    });
};
