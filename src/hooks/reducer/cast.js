//
// getItemに関する情報
//
//
import initialState from "../initalState";
// import theMovieDb from "themoviedb-javascript-library";

const castState = initialState.cast;

const tv = (state = castState, action) => {
  switch (action.type) {
    case "GET_PEOPLE":
      const _people = action.people;
      return {
        ...state,
        people: {
          results: _people.results,
          page: _people.page,
          totalResult: _people.total_results,
          totalPage: _people.total_pages,
        },
      };

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

    case "GET_CAST":
      return {
        ...state,
        viewItem: {
          cast: action.cast,
          work: [],
        },
      };

    case "GET_CAST_WORK":
      console.log(action.work);
      return {
        ...state,
        viewItem: {
          cast: state.viewItem.cast,
          work: action.work.cast,
        },
      };
    default:
      return state;
  }
};

export default tv;
