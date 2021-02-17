import React, { useContext } from "react";
import AppContext from "../../../hooks/contexts/AppContext";
import noPhoto from "../../../asset/imags/no_500.png";
import { PieChart } from "../../components/";
import { MoreButton } from "../../components/button/";
import { POSTER_342 } from "../../../hooks/hoge";
import { Link } from "react-router-dom";
import theMovieDb from "themoviedb-javascript-library";

const SearchCast = () => {
  const { state, dispatch } = useContext(AppContext);

  const jumpToCast = (e) => {
    // e.preventDefault();
    const id = e.target.id;
    theMovieDb.people.getById(
      { id: id },
      (cast) => {
        dispatch({
          type: "GET_CAST",
          cast: JSON.parse(cast),
        });
        console.log(JSON.parse(cast));
      },
      (error) => {
        console.error(error);
      }
    );
    theMovieDb.people.getCredits(
      { id: id },
      (work) => {
        dispatch({ type: "GET_CAST_WORK", work: JSON.parse(work) });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const onClickAddSearch = (e) => {
    e.preventDefault();
    const value = state.search.string;
    const nowPage = state.cast.searchItems.page;
    theMovieDb.search.getPerson(
      { query: value, page: nowPage + 1 },
      (result) => {
        dispatch({ type: "ADD_SEARCH_CAST_ITEMS", data: JSON.parse(result) });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <>
      <ul>
        {state.cast.searchItems.results.map((result, i) => {
          return (
            <li key={i} className='flexBox'>
              <div className='flexBox__left'>
                {result.profile_path !== null ? (
                  <Link to={`/cast/${result.name}`} id={result.id} onClick={jumpToCast}>
                    <img src={POSTER_342 + result.profile_path} alt='' />
                  </Link>
                ) : (
                  <img src={noPhoto} alt='no' />
                )}
              </div>
              <div className='flexBox__right'>
                <h3 className='flexBox__title'>
                  <Link to={`/cast/${result.name}`} id={result.id} onClick={jumpToCast}>
                    {result.name}
                  </Link>
                </h3>
                <div className='flexBox__review'>
                  <PieChart
                    width={47}
                    height={47}
                    inner={18}
                    outer={23}
                    review={result.vote_average}
                  />
                  <span className='flexBox__review--num'>
                    {result.vote_average * 10}
                    <small>%</small>
                  </span>
                </div>
                <time className='flexBox__date'>{result.release_date}</time>
                {(result.known_for || []).map((t, i) => (
                  <span className='flexBox__knowFor' key={i}>
                    {t.title || t.name}
                  </span>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
      <MoreButton onClick={onClickAddSearch} />
    </>
  );
};

export default SearchCast;
