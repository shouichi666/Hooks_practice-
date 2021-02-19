import React, { useCallback, useContext, useState } from "react";
import { Route, Link } from "react-router-dom";
import AppContext from "../../../../hooks/contexts/AppContext";
import { Popular, Rated } from ".";

const ArchiveTv = () => {
  const { state } = useContext(AppContext);
  const [view, setView] = useState("popular");

  const selectView = useCallback((e) => {
    const id = e.target.id;
    switch (id) {
      case "popular":
        return setView("popular");
      case "rated":
        return setView("rated");
      default:
        return;
    }
  },[]);

  return (
    <>
      <div className='SearchResult'></div>
      <h2 className='page_heading'>{view === "popular" ? "人気" : "高評価"}の作品</h2>
      <div className='archiveContainer twoColoum'>
        {/* サイド */}
        <div className='twoColoum__side'>
          <aside className='fixed-aside'>
            <h3>TV</h3>
            <ul className='fixed-aside__list'>
              <li className='fixed-aside__list--row'>
                <Link to='/tv/list/popular' id='popular' onClick={selectView}>
                  人気の作品
                </Link>
                <span>{state.tv.popular.totalResult || "0"}</span>
              </li>
              <li className='fixed-aside__list--row'>
                <Link to='/tv/list/rated' id='rated' onClick={selectView}>
                  高評価
                </Link>
                <span>{state.tv.rated.totalResult || "0"}</span>
              </li>
            </ul>
          </aside>
        </div>

        {/* メイン */}
        <div className='twoColoum__main search__contents'>
          <Route path='/tv/list/popular'>
            <Popular />
          </Route>
          <Route path='/tv/list/rated'>
            <Rated />
          </Route>
        </div>
      </div>
    </>
  );
};

export default ArchiveTv;
