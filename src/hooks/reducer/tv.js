//
// getItemに関する情報
//
//
import initialState from "../initalState";
// import theMovieDb from "themoviedb-javascript-library";

const tvState = initialState.tv;

const tv = (state = tvState, action) => {
  switch (action.type) {
    case "GET_TV":
      console.log(action.data);
      return { ...state, viewItem: action.data };

    case "GET_TOP_RATED_TV":
      const _rated = action.rated;
      return {
        ...state,
        rated: {
          results: _rated.results,
          page: _rated.page,
          totalResult: _rated.total_results,
          totlaPage: _rated.total_pages,
        },
      };

    case "GET_POPULAR_TV":
      const _popular = action.popular;
      // console.log(_popular);
      return {
        ...state,
        popular: {
          results: _popular.results,
          page: _popular.page,
          totalResult: _popular.total_results,
          totlaPage: _popular.total_pages,
        },
      };

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
      const addSearchItems = action.data;
      return {
        ...state,
        searchItems: {
          results: state.searchItems.results.concat(addSearchItems.results),
          page: addSearchItems.page,
          totalResult: addSearchItems.total_results,
          totalPage: addSearchItems.total_pages,
        },
      };

    case "ADD_POPULAR_TV":
      const addPopular = action.popular;
      console.log(addPopular);
      return {
        ...state,
        popular: {
          results: state.popular.results.concat(addPopular.results),
          page: addPopular.page,
          totalResult: addPopular.total_results,
          totalPage: addPopular.total_pages,
        },
      };

    case "ADD_TOP_RATED_TV":
      const addTopRoted = action.rated;
      return {
        ...state,
        rated: {
          results: state.rated.results.concat(addTopRoted.results),
          page: addTopRoted.page,
          totalResult: addTopRoted.total_results,
          totalPage: addTopRoted.total_pages,
        },
      };
    default:
      return state;
  }
};

export default tv;
