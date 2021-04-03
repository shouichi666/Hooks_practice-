import React, { useContext } from "react";
import AppContext from "../../../hooks/contexts/AppContext";
import theMovieDb from "themoviedb-javascript-library";
import InfiniteScroll from "react-infinite-scroller";
import { CastCard, Loading } from "../../components";

const SearchCast = () => {
  const { state, dispatch } = useContext(AppContext);

  const onScrollAddSearch = (num) => {
    const value = state.search.searchWords;
    theMovieDb.search.getPerson(
      { query: value, page: num },
      (result) => {
        dispatch({ type: "ADD_SEARCH_CAST_ITEMS", data: JSON.parse(result) });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <InfiniteScroll
      pageStart={state.cast.searchItems.page}
      // hasMore={false}
      hasMore={state.cast.searchItems.results.length < 19 ? false : true}
      loadMore={onScrollAddSearch}
      loader={<Loading/>}
    >
      <ul>
        {state.cast.searchItems.results.map((result, i) => {
          return <CastCard result={result} key={i} />;
        })}
      </ul>
    </InfiniteScroll>
  );
};

export default SearchCast;
