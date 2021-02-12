//
// getItemに関する情報
//
//
import initialState from "../initalState";
// import theMovieDb from "themoviedb-javascript-library";

const castState = initialState.cast;

const tv = (state = castState, action) => {
  switch (action.type) {
    case "SET_CAST_SEARTCH_ITEMS":
      const data = action.data;
      const newObj = {
        page: data.page,
        results: data.results,
        totalResult: data.total_results,
        totalPage: data.total_pages,
      };
      return { ...state, searchItems: newObj };

    case "ADD_SEARCH_CAST_ITEMS":
      const addResults = action.data.results;
      const newResults = state.searchItems.results.concat(addResults);

      const newSearchItems = {
        results: newResults,
        page: action.data.page,
        totalResult: action.data.total_results,
        totalPage: action.data.total_pages,
      };
      return { ...state, searchItems: newSearchItems };
    default:
      return state;
  }
};

export default tv;
