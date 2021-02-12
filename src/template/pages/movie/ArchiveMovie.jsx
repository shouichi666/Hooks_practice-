import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
// import { PieChart } from "../../components";
// import { CastSliderBox, Xslider, XsliderBox } from "../../components/slider";
import AppContext from "../../../hooks/contexts/AppContext";
import theMovieDb from "themoviedb-javascript-library";
// import { POSTER_342, BACKDROP_780 } from "../../../hooks/hoge";

const ArchiveMovie = () => {
  // const history = useHistory();
  const { state } = useContext(AppContext);

  const windowTop = () => {
    window.scrollTo(0, 0);
  };

  // useEffect(getMovie, [state]);
  useEffect(windowTop, [state]);

  return (
    <main>
      <div className='SearchResult'></div>
      <div className='archiveContainer twoColoum'>
        {/* サイド */}
        <div className='twoColoum__side'>
          <aside className='fixed-aside'>
            <h3>検索結果</h3>
            <ul className='fixed-aside__list'>
              <Link to='/search/all'>
                <li className='fixed-aside__list--row'>
                  ALL
                  <span>{state.common.searchItems.totalResult || "0"}</span>
                </li>
              </Link>
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
        <div className='twoColoum__main search__contents'></div>
      </div>
    </main>
  );
  // } else {
  //   return <h1>tt</h1>;
  // }
};

export default ArchiveMovie;
