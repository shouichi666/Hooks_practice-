import React, { useState, useContext } from "react";
import AppContext from "../../../hooks/contexts/AppContext";
import { _mapCastSliderBox, _windowTop } from "../../../hooks/hoge";
import theMovieDb from "themoviedb-javascript-library";

const ArchiveCast = () => {
  const { state, dispatch } = useContext(AppContext);
  const [pageN, setPage] = useState(1);
  const totalResult = state.cast.people.totalResult;
  const totalPage = totalResult / 20;
  const crrentPage = state.cast.people.page;

  const pageClick = (e) => {
    const value = Number(e.target.value);
    _windowTop();
    setPage(value);
    theMovieDb.people.getPopular(
      { page: value },
      (people) => {
        dispatch({
          type: "GET_PEOPLE",
          people: JSON.parse(people),
          page: value,
        });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  let prevClass = pageN === 1 ? "reActiove" : "";
  let nextClass = pageN === totalPage ? "reActiove" : "";
  return (
    <>
      <h2 className='page_heading'>人気の出演スタッフ</h2>
      <div className='gridFiveColum'>
        {_mapCastSliderBox(state.cast.people.results)}
      </div>

      <ul className='pageNation'>
        <li className={`pageNation__first ${prevClass}`}>
          <button value={1} onClick={pageClick}>
            FIRST
          </button>
        </li>
        <li className={`pageNation__prev ${prevClass}`}>
          <button onClick={pageClick} value={pageN - 1}>
            ≪
          </button>
        </li>

        {[...Array(totalPage).keys()].map((page, i) => {
          page++;
          const crrentClass = crrentPage === page ? "crrentPage" : "otherPage";

          return pageN + 5 > page && pageN - 3 < page ? (
            <li key={i}>
              <button
                className={`pageNation__num ${crrentClass}`}
                key={i}
                onClick={pageClick}
                value={page}
              >
                {page}
              </button>
            </li>
          ) : (
            ""
          );
        })}
        <li className={`pageNation__next ${nextClass}`}>
          <button onClick={pageClick} value={pageN + 1}>
            ≫
          </button>
        </li>
        <li className={`pageNation__last ${nextClass}`}>
          <button value={totalPage} onClick={pageClick}>
            LAST
          </button>
        </li>
      </ul>
    </>
  );
};

export default ArchiveCast;
