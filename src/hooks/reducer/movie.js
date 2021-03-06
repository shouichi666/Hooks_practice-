//
// getItemに関する情報
//
//
import initialState from "../appState";
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
      const rated = action.rated;
      const newRated = {
        results: rated.results,
        page: rated.page,
        totalResult: rated.total_results,
        totalPage: rated.total_pages,
      };
      return { ...state, rated: newRated };

    case "GET_POPULAR_MOVIE":
      const popular = action.popular;
      return {
        ...state,
        popular: {
          page: popular.page,
          results: popular.results,
          totalResult: popular.total_results,
          totalPage: popular.total_pages,
        },
      };

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

    case "ADD_TOP_RATED_MOVIE":
      const _rated = action.rated;
      return {
        ...state,
        rated: {
          results: state.rated.results.concat(_rated.results),
          page: _rated.page + 1,
          totalResult: _rated.total_results,
          totalPage: _rated.total_pages,
        },
      };

    case "ADD_POPULAR_MOVIE":
      const _popular = action.popular;
      return {
        ...state,
        popular: {
          results: state.popular.results.concat(action.popular.results),
          page: _popular.page,
          totalResult: _popular.total_results,
          totalPage: _popular.total_pages,
        },
      };

    case "GET_GENRES_MOVIE":
      const _words = action.genres;
      return {
        ...state,
        words: {
          id: action.id,
          keyword: "",
          page: _words.page,
          results: _words.results,
          totalPage: _words.total_pages,
          totalResult: _words.total_results,
        },
      };

    case "ADD_GENRES_MOVIE":
      const _AddWords = action.genres;
      return {
        ...state,
        words: {
          id: state.words.id,
          keyword: "",
          page: _AddWords.page,
          results: state.words.results.concat(_AddWords.results),
          totalPage: _AddWords.total_pages,
          totalResult: _AddWords.total_results,
        },
      };

    case "GET_KEYWORD_MOVIE":
      const _keyword = action.keyword;
      console.log(_keyword);
      return {
        ...state,
        words: {
          id: action.id,
          keyword: action.key,
          page: _keyword.page,
          results: _keyword.results,
          totalPage: _keyword.total_pages,
          totalResult: _keyword.total_results,
        },
      };

    case "ADD_KEYWORD_MOVIE":
      const _addKey = action.keyword;
      return {
        ...state,
        words: {
          id: state.words.id,
          keyword: state.words.keyword,
          page: _addKey.page,
          results: state.words.results.concat(_addKey.results),
          totalPage: _addKey.total_pages,
          totalResult: _addKey.total_results,
        },
      };

    default:
      return state;
  }
};

export default movie;
