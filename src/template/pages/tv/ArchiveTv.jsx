import React, { useContext, useState } from "react";
import { MoreButton } from "../../components/button";
import AppContext from "../../../hooks/contexts/AppContext";
import theMovieDb from "themoviedb-javascript-library";
import { _MapXsliderBox } from "../../../hooks/hoge";

const ArchiveTv = () => {
  // const history = useHistory();
  const { state, dispatch } = useContext(AppContext);
  const [view, setView] = useState("popular");
  const [page, setPage] = useState({
    popular: 1,
    rated: 1,
  });
  const [hidden, setHidden] = useState(false);

  const toggleView = (view) => {
    if (view === "popular") {
      return _MapXsliderBox(state.tv.popular.results, "tv");
    } else if (view === "rated") {
      return _MapXsliderBox(state.tv.rated.results, "tv");
    }
  };

  const selectView = (e) => {
    const id = e.target.id;
    switch (id) {
      case "popular":
        return setView("popular");
      case "rated":
        return setView("rated");
      default:
        return;
    }
  };

  const onClickAddRecest = (e) => {
    e.preventDefault();
    if (view === "popular") {
      theMovieDb.tv.getPopular(
        { page: page.popular + 1, include_adult: true },
        (tv) => {
          dispatch({ type: "ADD_POPULAR_TV", popular: JSON.parse(tv) });
        },
        (error) => console.log(error)
      );
      setPage({ ...page, popular: page.popular + 1 });
    } else if (view === "rated") {
      theMovieDb.tv.getTopRated(
        { page: page.rated + 1, include_adult: true },
        (tv) => {
          dispatch({ type: "ADD_TOP_RATED_TV", rated: JSON.parse(tv) });
        },
        (error) => console.log(error)
      );
      setPage({ ...page, rated: page.rated + 1 });
    }
  };

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
              <li className='fixed-aside__list--row' id='popular' onClick={selectView}>
                人気の作品
                <span>{state.tv.popular.totalResult || "0"}</span>
              </li>
              <li className='fixed-aside__list--row' id='rated' onClick={selectView}>
                高評価
                <span>{state.tv.rated.totalResult || "0"}</span>
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
  // } else {
  //   return <h1>tt</h1>;
  // }
};

export default ArchiveTv;
