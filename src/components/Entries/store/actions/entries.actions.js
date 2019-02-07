export const GET_ENTRIES_SUCCESS = "[ENTRIES] GET_ENTRIES]";
export const ADD_ENTRY_SUCCESS = "[ENTRIES] ADD_ENTRY_SUCCESS]";

export const getEntries = entries => {
  return {
    type: GET_ENTRIES_SUCCESS,
    payload: entries
  };
};

export const addEntry = entry => {
  return {
    type: ADD_ENTRY_SUCCESS,
    payload: entry
  };
};
