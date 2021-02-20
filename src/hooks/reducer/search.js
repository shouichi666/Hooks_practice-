//
// getItemに関する情報
//
//
import initialState from "../appState";
const searchState = initialState.search;

const search = (state = searchState, action) => {
  switch (action.type) {
    case "SET_SEARCH_STRING":
      return { ...state, string: action.string };

    case "DELETE_SEARCH_STRING":
      return { ...state, string: "" };

    default:
      return state;
  }
};

export default search;
