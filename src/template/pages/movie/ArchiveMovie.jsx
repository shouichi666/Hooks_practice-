import React, { useContext, useEffect, useState } from "react";
// import { Link, useHistory } from "react-router-dom";
import AppContext from "../../../hooks/contexts/AppContext";
import theMovieDb from "themoviedb-javascript-library";
import { MoreButton } from "../../components/button";
import { _MapXsliderBox } from "../../../hooks/hoge";

const ArchiveMovie = () => {
  // const history = useHistory();
  const { state, dispatch } = useContext(AppContext);
  const [view, setView] = useState("popular");
  const [page, setPage] = useState({
    popular: 1,
    rated: 1,
  });
  const [hidden, setHidden] = useState(true);
  // 人気、高評価、トレンド、最新作、

  const toggleView = (view) => {
    if (view === "popular") {
      return _MapXsliderBox(state.movie.popular.results, "movie");
    } else if (view === "today") {
      return _MapXsliderBox(state.movie.day, "movie");
    } else if (view === "week") {
      return _MapXsliderBox(state.movie.week, "movie");
    } else if (view === "rated") {
      return _MapXsliderBox(state.movie.rated.results, "movie");
    }
  };

  const selectView = (e) => {
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
  };

  const onClickAddRecest = (e) => {
    e.preventDefault();
    if (view === "popular") {
      theMovieDb.movies.getTopRated(
        { page: page.popular + 1 },
        (movie) => {
          dispatch({ type: "ADD_POPULAR_MOVIE", popular: JSON.parse(movie) });
        },
        (error) => console.log(error)
      );
      setPage({ ...page, popular: page.popular + 1 });
    } else if (view === "rated") {
      theMovieDb.movies.getTopRated(
        { page: page.rated + 1 },
        (movie) => {
          dispatch({ type: "ADD_TOP_RATED_MOVIE", rated: JSON.parse(movie) });
        },
        (error) => console.log(error)
      );
      setPage({ ...page, rated: page.rated + 1 });
    }
  };

  useEffect(() => {
    view === "today" || view === "week" ? setHidden(true) : setHidden(false);
  }, [view]);

  // const windowTop = () => {
  //   window.scrollTo(0, 0);
  // };

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
              <li className='fixed-aside__list--row' id='popular' onClick={selectView}>
                人気の作品
                <span>{state.movie.popular.totalPage || "0"}</span>
              </li>
              <li className='fixed-aside__list--row' id='rated' onClick={selectView}>
                高評価
                <span>{state.movie.rated.totalResult || "0"}</span>
              </li>
              <li className='fixed-aside__list--row' id='week' onClick={selectView}>
                今週のトレンド
                <span>{state.movie.week.length || "0"}</span>
              </li>
              <li className='fixed-aside__list--row' id='today' onClick={selectView}>
                今日のトレンド
                <span>{state.movie.day.length || "0"}</span>
              </li>
            </ul>
          </aside>
        </div>

        {/* メイン */}
        <div className='twoColoum__main search__contents'>
          <div className='flexWrap'>{toggleView(view)}</div>
          <MoreButton onClick={onClickAddRecest} hidden={hidden} />
        </div>
      </div>
    </>
  );
};

export default ArchiveMovie;
