//
// getItemに関する情報
//
//
import initialState from "../initalState";
// import theMovieDb from "themoviedb-javascript-library";

const tvState = initialState.tv;

const tv = (state = tvState, action) => {
  switch (action.type) {
    case "GET_MOVIE":
      return { ...state, viewItem: action.data };

    case "GET_TOP_ROTED_TV":
      return { ...state, topTv: action.data };

    case "GET_POPULAR_TV":
      return { ...state, topPopular: action.data };

    case "SET_TV_SEARTCH_ITEMS":
      const data = action.data;
      const newObj = {
        page: data.page,
        results: data.results,
        totalResult: data.total_results,
        totalPage: data.total_pages,
      };
      return { ...state, searchItems: newObj };

    case "ADD_SEARCH_TV_ITEMS":
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
