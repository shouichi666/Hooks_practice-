//
// getItemに関する情報
//
//
import initialState from "../initalState";
// import theMovieDb from "themoviedb-javascript-library";

const tvState = initialState.tv;

const tv = (state = tvState, action) => {
  switch (action.type) {
    case "GET_ID_TV":
      const viewItem = action.data;
      return { ...state, viewItem };

    case "GET_TOP_ROTED_TV":
      return { ...state, topTv: action.data };

    case "GET_POPULAR_TV":
      return { ...state, topPopular: action.data };

    case "TV":
      console.log("TV");
      return state;
    default:
      return state;
  }
};

export default tv;
