//
// getItemに関する情報
//
//
import initialState from "../initalState";
// import theMovieDb from "themoviedb-javascript-library";

const movieState = initialState.movie;

const movie = (state = movieState, action) => {
  switch (action.type) {
    case "GET_DAY_MOVIES":
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
    



    case "TOP_MOVIE":
      console.log("TOP_MOVIE");
      return state;
    default:
      return state;
  }
};

export default movie;
