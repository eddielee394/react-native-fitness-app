import { Api, Helpers } from "../../../../utils";
import * as EntryActions from "../../../../components/Entries/store/actions";

export const GET_CALENDAR_RESULTS_SUCCESS =
  "[HISTORY] GET_CALENDAR_RESULTS_SUCCESS]";

export const getCalendarResults = entries => dispatch => {
  const request = Api.fetchCalendarResults(entries);

  request
    .then(response => {
      return dispatch(EntryActions.getEntries(response));
    })
    .then(response => {
      console.log("response 2", response);

      if (!response[Helpers.timeToString()]) {
        return dispatch(
          EntryActions.addEntry({
            [Helpers.timeToString()]: Helpers.getDailyReminderValue()
          })
        );
      }
    });
};
