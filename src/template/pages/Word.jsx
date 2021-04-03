import React, { useState, useContext, useEffect, useCallback } from "react";
import { Route, useLocation } from "react-router-dom";
import AppContext from "../../hooks/contexts/AppContext";
import {
  _checkGenreMovie,
  _checkGenreTv,
  _mapXsliderBox,
  _addGenresMovie,
  _addGenresTv,
  _addKeywordMovie,
  _addKeywordTv,
  _windowTop,
} from "../../hooks/hoge";
import InfiniteScroll from "react-infinite-scroller";
import { Loading } from "../components";

const Word = React.memo(() => {
  const { state, dispatch } = useContext(AppContext);
  const location = useLocation().pathname;
  const wordMovie = state.movie.words;
  const wordTv = state.tv.words;
  const [view, setView] = useState("movie");

  useEffect(() => {
    const res = location.indexOf("movie");
    res !== -1 ? setView("movie") : setView("tv");
    _windowTop();
  }, [location]);

  const addMovie = useCallback(() => {
    _addGenresMovie(dispatch, wordMovie.id, wordMovie.page + 1);
  }, [wordMovie, dispatch]);

  const addTv = useCallback(() => {
    _addGenresTv(dispatch, wordTv.id, wordTv.page + 1);
  }, [wordTv, dispatch]);

  const addKeywordMovie = useCallback(() => {
    _addKeywordMovie(dispatch, wordMovie.id, wordMovie.page + 1);
  }, [dispatch, wordMovie.id, wordMovie.page]);

  const addKeywordTv = useCallback(() => {
    _addKeywordTv(dispatch, wordTv.id, wordTv.page + 1);
  }, [dispatch, wordTv.id, wordTv.page]);

  const pageHeadingJudge = useCallback(() => {
    if (view === "movie") {
      if (_checkGenreMovie(wordMovie.id) === false) {
        return wordMovie.keyword;
      } else {
        return _checkGenreMovie(wordMovie.id);
      }
    } else if (view === "tv") {
      if (_checkGenreTv(wordTv.id) === false) {
        return wordTv.keyword;
      } else {
        return _checkGenreTv(wordTv.id);
      }
    }
  }, [view, wordTv, wordMovie]);

  let toggleMovie =
    wordMovie.results.length === 0 || wordMovie.page > wordMovie.totalPage
      ? false
      : true;
  let toggleTv =
    wordTv.results.length === 0 || wordTv.page > wordTv.totalPage
      ? false
      : true;

  return (
    <>
      <div className='words'>
        <h2 className='words__heading'>{pageHeadingJudge()}</h2>
        <p className='words__count'>
          <strong>
            {view === "movie" ? wordMovie.totalResult : wordTv.totalResult}
          </strong>
          本の作品
        </p>
      </div>

      <div className='words__container'>
        <Route path='/words/movie/:id'>
          <InfiniteScroll
            hasMore={toggleMovie}
            loadMore={addMovie}
            pageStart={wordMovie.page}
            loader={<Loading/>}
          >
            <div className='flexWrap'>{_mapXsliderBox(wordMovie.results)}</div>
          </InfiniteScroll>
        </Route>

        <Route path='/words/tv/:id'>
          <InfiniteScroll
            hasMore={toggleTv}
            loadMore={addTv}
            pageStart={wordTv.page}
            loader={<Loading/>}
          >
            <div className='flexWrap'>{_mapXsliderBox(wordTv.results)}</div>
          </InfiniteScroll>
        </Route>

        <Route path='/words/k/movie/:id'>
          <InfiniteScroll
            hasMore={toggleMovie}
            loadMore={addKeywordMovie}
            pageStart={1}
            loader={<Loading/>}
          >
            <div className='flexWrap'>{_mapXsliderBox(wordMovie.results)}</div>
          </InfiniteScroll>
        </Route>

        <Route path='/words/k/tv/:id'>
          <InfiniteScroll
            hasMore={toggleTv}
            loadMore={addKeywordTv}
            loader={<Loading/>}
            pageStart={1}
          >
            <div className='flexWrap'>{_mapXsliderBox(wordTv.results)}</div>
          </InfiniteScroll>
        </Route>
      </div>
    </>
  );
});

export default Word;
