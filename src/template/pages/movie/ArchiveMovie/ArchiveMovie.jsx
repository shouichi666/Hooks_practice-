import React, { useCallback, useContext, useState } from "react";
import { Link, Route } from "react-router-dom";
import AppContext from "../../../../hooks/contexts/AppContext";
import { Rated, Popular, Today, Week } from "./";

const ArchiveMovie = () => {
  const { state } = useContext(AppContext);
  const [view, setView] = useState("popular");

  const selectView = useCallback((e) => {
    const id = e.target.id;
    switch (id) {
      case "popular":
        return setView("popular");
      case "today":
        return setView("today");
      case "week":
        return setView("week");
      case "rated":
        return setView("rated");
      default:
        return;
    }
  }, []);

  return (
    <>
      <div className='SearchResult'></div>
      <h2 className='page_heading'>
        {view === "popular"
          ? "人気の作品"
          : view === "rated"
          ? "高評価の作品"
          : view === "all"
          ? "すべての映画"
          : view === "today"
          ? "今日のトレンド"
          : view === "week"
          ? "今週のトレンド"
          : ""}
      </h2>
      <div className='archiveContainer twoColoum'>
        {/* サイド */}
        <div className='twoColoum__side'>
          <aside className='fixed-aside'>
            <h3>MOVIE</h3>
            <ul className='fixed-aside__list'>
              <li className='fixed-aside__list--row'>
                <Link to='/movie/list/popular' id='popular' onClick={selectView}>
                  人気の作品
                </Link>
                <span>{state.movie.popular.totalPage || "0"}</span>
              </li>
              <li className='fixed-aside__list--row'>
                <Link to='/movie/list/rated' id='rated' onClick={selectView}>
                  高評価
                </Link>
                <span>{state.movie.rated.totalResult || "0"}</span>
              </li>
              <li className='fixed-aside__list--row'>
                <Link to='/movie/list/week' id='week' onClick={selectView}>
                  今週のトレンド
                </Link>
                <span>{state.movie.week.length || "0"}</span>
              </li>
              <li className='fixed-aside__list--row'>
                <Link to='/movie/list/today' id='today' onClick={selectView}>
                  今日のトレンド
                </Link>
                <span>{state.movie.day.length || "0"}</span>
              </li>
            </ul>
          </aside>
        </div>

        {/* メイン */}
        <div className='twoColoum__main search__contents'>
          <Route path='/movie/list/rated'>
            <Rated />
          </Route>
          <Route path='/movie/list/popular'>
            <Popular />
          </Route>
          <Route path='/movie/list/today'>
            <Today />
          </Route>
          <Route path='/movie/list/week'>
            <Week />
          </Route>
          {/* <MoreButton onClick={onClickAddRecest} hidden={hidden} /> */}
        </div>
      </div>
    </>
  );
};

export default ArchiveMovie;
