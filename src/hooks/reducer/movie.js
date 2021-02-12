//
// getItemに関する情報
//
//
import initialState from "../initalState";
// import theMovieDb from "themoviedb-javascript-library";

const movieState = initialState.movie;

const movie = (state = movieState, action) => {
  switch (action.type) {
    case "GET_MOVIE":
      return { ...state, viewItem: action.data };

    case "GET_DAY_MOVIES": //
      const day = action.dayData[0];
      return { ...state, day };

    case "GET_WEEK_MOVIES":
      const week = action.weekData[0];
      return { ...state, week };

    case "GET_TOP_ROTED_MOVIE":
      const topMovies = action.data.results;
      return { ...state, topMovies };

    case "GET_POPULAR_MOVIE":
      return { ...state, topPopular: action.data };

    case "SET_MOVIE_SEARTCH_ITEMS":
      const data = action.data;
      const newObj = {
        page: data.page,
        results: data.results,
        totalResult: data.total_results,
        totalPage: data.total_pages,
      };
      return { ...state, searchItems: newObj };

    case "ADD_SEARCH_MOVIE_ITEMS":
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

export default movie;
