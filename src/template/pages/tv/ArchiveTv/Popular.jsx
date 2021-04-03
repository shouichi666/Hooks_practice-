import React, { useCallback, useContext } from "react";
import AppContext from "../../../../hooks/contexts/AppContext";
import theMovieDb from "themoviedb-javascript-library";
import { _mapXsliderBox } from "../../../../hooks/hoge";
import InfiniteScroll from "react-infinite-scroller";
import Loading from "../../../components/Loading";

const Favorite = () => {
  const { state, dispatch } = useContext(AppContext);

  const onClickAddRecest = useCallback(
    (num) => {
      return theMovieDb.tv.getPopular(
        { page: num },
        (movie) => {
          dispatch({ type: "ADD_POPULAR_TV", popular: JSON.parse(movie) });
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
        hasMore={state.tv.popular.results.length > 0 ? true : false}
        pageStart={state.tv.popular.page}
        loader={<Loading/>}
      >
        <div className='flexWrap'>
          {_mapXsliderBox(state.tv.popular.results, "tv")}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Favorite;
