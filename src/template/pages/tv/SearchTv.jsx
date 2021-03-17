import React, { useCallback, useContext } from "react";
import AppContext from "../../../hooks/contexts/AppContext";
import theMovieDb from "themoviedb-javascript-library";
import InfiniteScroll from "react-infinite-scroller";
import ResultCard from "../../components/ResultCard";

const SearchTv = () => {
  const { state, dispatch } = useContext(AppContext);

  const onScrollAddSearch = useCallback(
    (num) => {
      const value = state.search.string;
      theMovieDb.search.getTv(
        { query: value, page: num, include_adult: true },
        (result) => {
          dispatch({ type: "ADD_SEARCH_TV_ITEMS", data: JSON.parse(result) });
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
      hasMore={state.movie.searchItems.results.length === 0 ? false : true}
      loadMore={onScrollAddSearch}
      pageStart={state.tv.searchItems.page}
    >
      <ul>
        {state.tv.searchItems.results.map((result, i) => {
          return <ResultCard key={i} result={result} />;
        })}
      </ul>
    </InfiniteScroll>
  );
};

export default SearchTv;
