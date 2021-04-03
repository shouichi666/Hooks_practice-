import React, { useCallback, useContext } from "react";
import AppContext from "../../../../hooks/contexts/AppContext";
import theMovieDb from "themoviedb-javascript-library";
import { _mapXsliderBox } from "../../../../hooks/hoge";
import InfiniteScroll from "react-infinite-scroller";
import { Loading } from "../../../components";

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
        loader={<Loading/>}
      >
        <div className='flexWrap'>
          {_mapXsliderBox(state.movie.popular.results, "movie")}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Favorite;
