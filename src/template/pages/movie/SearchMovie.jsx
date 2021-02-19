import React, { useCallback, useContext } from "react";
import AppContext from "../../../hooks/contexts/AppContext";
import noPhoto from "../../../asset/imags/no_500.png";
import { PieChart } from "../../components/";
import { POSTER_342, BACKDROP_780, ChangeLanguage } from "../../../hooks/hoge";
import { Link } from "react-router-dom";
import theMovieDb from "themoviedb-javascript-library";
import InfiniteScroll from "react-infinite-scroller";

const SearchMovie = () => {
  const { state, dispatch } = useContext(AppContext);

  const jumpToMovie = (e) => {
    const id = e.target.id;
    theMovieDb.movies.getById(
      { id: id },
      (movie) => {
        dispatch({ type: "GET_MOVIE", data: JSON.parse(movie) });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const onScrollAddSearch = useCallback(
    (num) => {
      const value = state.search.string;
      theMovieDb.search.getMovie(
        { query: value, page: num, include_adult: true },
        (result) => {
          dispatch({ type: "ADD_SEARCH_MOVIE_ITEMS", data: JSON.parse(result) });
        },
        (error) => {
          console.log(error);
        }
      );
    },
    [dispatch, state.search]
  );

  return (
    <InfiniteScroll
      pageStart={1}
      hasMore={state.movie.searchItems.results.length === 0 ? false : true}
      loadMore={onScrollAddSearch}
    >
      <ul>
        {state.movie.searchItems.results.map((result, i) => {
          return (
            <li
              key={i}
              className='flexBox'
              style={{
                backgroundImage: `url(${BACKDROP_780 + result.backdrop_path})`,
                backgroundSize: "cover",
                backgroundPosition: "right -20px top -30px",
              }}
            >
              <div className='flexBox__left'>
                {result.poster_path !== null ? (
                  <Link to={`/movie/${result.id}`} onClick={jumpToMovie} id={result.id}>
                    <img src={POSTER_342 + result.poster_path} alt='' />
                  </Link>
                ) : (
                  <img src={noPhoto} alt='no' />
                )}
              </div>
              <div className='flexBox__right'>
                <h3 className='flexBox__title'>
                  <Link to={`/movie/${result.id}`} onClick={jumpToMovie} id={result.id}>
                    {result.title}
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
                <span className='flexBox__lang'>
                  {ChangeLanguage(result.original_language)}
                </span>
                <p className='flexBox__text'>{result.overview}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </InfiniteScroll>
  );
};

export default SearchMovie;
