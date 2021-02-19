import React, { useState, useContext, useEffect, useCallback } from "react";
import { Route, useLocation } from "react-router-dom";
import AppContext from "../../hooks/contexts/AppContext";
import {
  _CheckGenre,
  _MapXsliderBox,
  _AddGenresMovie,
  _AddGenresTv,
} from "../../hooks/hoge";
import InfiniteScroll from "react-infinite-scroller";

const Word = () => {
  const { state, dispatch } = useContext(AppContext);
  const location = useLocation().pathname;
  const wordMovie = state.movie.words;
  const wordTv = state.tv.words;
  const [view, setView] = useState("movie");

  useEffect(() => {
    const res = location.indexOf("movie");
    res !== -1 ? setView("movie") : setView("tv");
  }, [location]);

  const addMovie = useCallback(() => {
    _AddGenresMovie(dispatch, wordMovie.id, wordMovie.page + 1);
  }, [wordMovie, dispatch]);

  const addTv = useCallback(() => {
    _AddGenresTv(dispatch, wordTv.id, wordTv.page + 1);
  }, [wordTv, dispatch]);

  let toggleMovie = wordMovie.results.length === 0 ? false : true;
  let toggleTv = wordTv.results.length === 0 ? false : true;

  return (
    <>
      <div className='words'>
        <h2 className='words__heading'>
          {view === "movie" ? _CheckGenre(wordMovie.id) : _CheckGenre(wordTv.id)}
        </h2>
        <p className='words__count'>
          <strong>{view === "movie" ? wordMovie.totalResult : wordTv.totalResult}</strong>
          本の作品
        </p>
      </div>

      <Route path='/words/movie/:id'>
        <InfiniteScroll
          hasMore={toggleMovie}
          loadMore={addMovie}
          pageStart={wordMovie.page}
        >
          <div className='flexWrap'>{_MapXsliderBox(wordMovie.results)}</div>
        </InfiniteScroll>
      </Route>

      <Route path='/words/tv/:id'>
        <InfiniteScroll hasMore={toggleTv} loadMore={addTv} pageStart={wordTv.page}>
          <div className='flexWrap'>{_MapXsliderBox(wordTv.results)}</div>
        </InfiniteScroll>
      </Route>
    </>
  );
};

export default Word;
