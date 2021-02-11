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

    case "SET_TYPE":
      return { ...state, searchType: action.searchType };

    case "SET_ARCHINE_ITEMS":
      const data = action.data;
      console.log(data);
      const newObj = {
        page: data.page,
        results: data.results,
        totalResult: data.total_results,
        totalPage: data.total_pages,
      };
      return { ...state, archiveItems: newObj };

    default:
      return state;
  }
};

export default common;