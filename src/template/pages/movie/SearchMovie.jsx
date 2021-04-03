import React, { useCallback, useContext } from "react";
import AppContext from "../../../hooks/contexts/AppContext";
import theMovieDb from "themoviedb-javascript-library";
import InfiniteScroll from "react-infinite-scroller";
import ResultCard from "../../components/ResultCard";

const SearchMovie = React.memo(() => {
  const { state, dispatch } = useContext(AppContext);

  const onScrollAddSearch = useCallback(
    (num) => {
      const value = state.search.searchWords;
      theMovieDb.search.getMovie(
        { query: value, page: num, include_adult: true },
        (result) => {
          dispatch({
            type: "ADD_SEARCH_MOVIE_ITEMS",
            data: JSON.parse(result),
          });
        },
        (error) => {
          console.log(error);
        }
      );
    },
    [dispatch, state.search]
  );

  return (
    <InfiniteScroll
      pageStart={1}
      hasMore={state.movie.searchItems.results.length === 0 ? false : true}
      loadMore={onScrollAddSearch}
    >
      <ul>
        {state.movie.searchItems.results.map((result, i) => {
          return <ResultCard key={i} result={result} />;
        })}
      </ul>
    </InfiniteScroll>
  );
});

export default SearchMovie;
