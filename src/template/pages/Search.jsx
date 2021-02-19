import React, { useContext, useEffect } from "react";
import AppContext from "../../hooks/contexts/AppContext";
import { Link, Route, useLocation } from "react-router-dom";
import { SearchMovie } from "./movie/";
import { SearchTv } from "./tv";
import { SearchCast } from "./cast";
import theMovieDb from "themoviedb-javascript-library";

const Search = () => {
  const { state, dispatch } = useContext(AppContext);
  const location = useLocation();
  const string = state.search.string;

  const getData = () => {
    if (string !== "") {
      theMovieDb.search.getMovie(
        { query: string, include_adult: true },
        (result) => {
          dispatch({ type: "SET_MOVIE_SEARTCH_ITEMS", data: JSON.parse(result) });
        },
        (error) => {
          console.log(error);
        }
      );
      theMovieDb.search.getTv(
        { query: string, include_adult: true },
        (result) => {
          dispatch({ type: "SET_TV_SEARTCH_ITEMS", data: JSON.parse(result) });
        },
        (error) => {
          console.log(error);
        }
      );
      theMovieDb.search.getPerson(
        { query: string, include_adult: true },
        (result) => {
          dispatch({ type: "SET_CAST_SEARTCH_ITEMS", data: JSON.parse(result) });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };

  let pageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case "/search/movie":
        return "MOVIE";
      case "/search/tv":
        return "TV";
      case "/search/cast":
        return "CAST";
      default:
        return;
    }
  };

  useEffect(getData, [string, dispatch]);

  return (
    <main id='Search' className='Search'>
      <div className='SearchResult'>
        <h2 className='page_heading'>{pageTitle()}</h2>
      </div>
      <div className='archiveContainer twoColoum'>
        {/* サイド */}
        <div className='twoColoum__side'>
          <aside className='fixed-aside'>
            <h3>検索結果</h3>
            <ul className='fixed-aside__list'>
              <Link to='/search/movie'>
                <li className='fixed-aside__list--row'>
                  MOVIE
                  <span>{state.movie.searchItems.totalResult || "0"}</span>
                </li>
              </Link>
              <Link to='/search/tv'>
                <li className='fixed-aside__list--row'>
                  TV
                  <span>{state.tv.searchItems.totalResult || "0"}</span>
                </li>
              </Link>
              <Link to='/search/cast'>
                <li className='fixed-aside__list--row'>
                  CAST
                  <span>{state.cast.searchItems.totalResult || "0"}</span>
                </li>
              </Link>
            </ul>
          </aside>
        </div>

        {/* メイン */}
        <div className='twoColoum__main search__contents'>
          <Route path='/search/tv'>
            <SearchTv />
          </Route>
          <Route path='/search/movie'>
            <SearchMovie />
          </Route>
          <Route path='/search/cast'>
            <SearchCast />
          </Route>
        </div>
      </div>
    </main>
  );
};

export default Search;
