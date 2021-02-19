import React, { useCallback, useContext } from "react";
import AppContext from "../../../../hooks/contexts/AppContext";
import theMovieDb from "themoviedb-javascript-library";
import { _MapXsliderBox } from "../../../../hooks/hoge";
import InfiniteScroll from "react-infinite-scroller";

const Favorite = () => {
  const { state, dispatch } = useContext(AppContext);

  const onClickAddRecest = useCallback(
    (num) => {
      return theMovieDb.movies.getPopular(
        { page: num },
        (movie) => {
          dispatch({ type: "ADD_POPULAR_MOVIE", popular: JSON.parse(movie) });
        },
        (error) => console.log(error)
      );
    },
    [dispatch]
  );

  return (
    <>
      {/* メイン */}
      <InfiniteScroll
        loadMore={onClickAddRecest}
        hasMore={state.movie.popular.results.length > 0 ? true : false}
        pageStart={state.movie.popular.page}
      >
        <div className='flexWrap'>
          {_MapXsliderBox(state.movie.popular.results, "movie")}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Favorite;
