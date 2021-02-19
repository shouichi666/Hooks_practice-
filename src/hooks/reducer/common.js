//
// getItemに関する情報
//
//
import initialState from "../initalState";
const commonState = initialState.common;

const common = (state = commonState, action) => {
  switch (action.type) {
    case "GET_VIEW_ITEM":
      const viewItem = action.data;
      return { ...state, viewItem };

    case "GET_KEYWORD":
      const keyword = action.data;
      return { ...state, keyword };

    case "SET_ALL_SEARCH_ITEMS":
      const data = action.data;
      const newObj = {
        page: data.page,
        results: data.results,
        totalResult: data.total_results,
        totalPage: data.total_pages,
      };
      return { ...state, searchItems: newObj };

    case "ADD_ALL_SEARCH_ITEMS":
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

export default common;
