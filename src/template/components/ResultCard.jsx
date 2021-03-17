import React, { useState, useContext, useEffect, useCallback } from "react";
import { MoreButton } from "./button";
import {
  POSTER_342,
  BACKDROP_780,
  changeLanguage,
  _registerDataWatchLater,
  _registerDataFavorite,
  _registerDataRecent,
  _findFromFavoriteId,
  _findFromWatchLaterId,
} from "../../hooks/hoge";
import { Link } from "react-router-dom";
import { MovieDialogList, FavoriteConditionalIcon } from "../components/";
import theMovieDb from "themoviedb-javascript-library";
import { PieChart } from "../components/";
import noPhoto from "../../asset/imags/no_500.png";
import AppContext from "../../hooks/contexts/AppContext";
import { db } from "../../firebase";

const ResultCard = (props) => {
  const result = props.result;
  const { state, dispatch } = useContext(AppContext);
  const [path, setPath] = useState("");
  const [open, setOpen] = useState(true);
  const [like, setLike] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [watch, setWatch] = useState(false);

  useEffect(() => {
    _findFromFavoriteId(db, state.users.id, result, () => setFavorite(true));
    _findFromWatchLaterId(db, state.users.id, result, () => setWatch(true));
  }, [result, state.users.id]);

  useEffect(() => {
    if (result.adult === false || result.adult === true) {
      setPath(`/movie/${result.id}`);
    } else {
      setPath(`/tv/${result.id}`);
    }
  }, [path, result]);

  useEffect(() => {
    _findFromFavoriteId(db, state.users.id, result, () => setLike(true));
  }, [result, state.users.id]);

  const onClickOpenDialog = () => setOpen(false);
  const onClickCloseDialog = () => setOpen(true);
  const jumpToMovie = useCallback(() => {
    if (state.users.isSignIn) _registerDataRecent(db, state.users.id, result);
    theMovieDb.movies.getById(
      { id: result.id },
      (movie) => {
        dispatch({ type: "GET_MOVIE", data: JSON.parse(movie) });
      },
      (error) => {
        console.log(error);
      }
    );
  }, [dispatch, result, state.users]);

  const jumpToTvView = useCallback(() => {
    _registerDataRecent(db, state.users.id, result);
    theMovieDb.tv.getById(
      { id: result.id, include_adult: true },
      (tv) => {
        dispatch({ type: "GET_TV", data: JSON.parse(tv) });
      },
      (error) => {
        console.log(error);
      }
    );
  }, [result, dispatch, state.users.id]);

  return (
    <li
      className='flexBox'
      style={{
        backgroundImage: `url(${BACKDROP_780 + result.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "right -20px top -30px",
      }}
    >
      <div className='flexBox__left'>
        {result.poster_path !== null ? (
          <Link
            to={path}
            onClick={result.adult === undefined ? jumpToTvView : jumpToMovie}
          >
            <img src={POSTER_342 + result.poster_path} alt='' />
          </Link>
        ) : (
          <img src={noPhoto} alt='no' />
        )}
        <div className='flexBox__review'>
          <PieChart
            width={window.innerWidth > 400 ? 45 : 25}
            height={window.innerWidth > 400 ? 45 : 25}
            inner={window.innerWidth > 400 ? 19 : 11}
            outer={window.innerWidth > 400 ? 23 : 13}
            review={result.vote_average}
          />
          <span className='flexBox__review--num'>
            {result.vote_average * 10}
            <small>%</small>
          </span>
        </div>
      </div>
      <div className='flexBox__right'>
        <div className='flexBox__right--inner'>
          <div
            hidden={open}
            onClick={onClickCloseDialog}
            className='coverSheets'
          ></div>
          <MovieDialogList
            top='10%'
            data={result}
            open={open}
            onClose={onClickCloseDialog}
            pushDataFavorite={() =>
              _registerDataFavorite(
                db,
                state.users.id,
                result,
                onClickCloseDialog
              )
            }
            pushDataWatchLater={() =>
              _registerDataWatchLater(
                db,
                state.users.id,
                result,
                onClickCloseDialog
              )
            }
            favorite={favorite}
            watch={watch}
          />
          <MoreButton
            className={"flexBox__right--moreButton"}
            onClick={onClickOpenDialog}
          />
          <h3 className='flexBox__title'>
            <Link
              to={path}
              onClick={result.adult === undefined ? jumpToTvView : jumpToMovie}
            >
              {result.title || result.name}
            </Link>
          </h3>
          <div className='flex-alignCenter'>
            <time className='flexBox__date'>
              {result.release_date || result.first_air_date}
            </time>
            <span className='flexBox__lang'>
              {changeLanguage(result.original_language)}
            </span>
            <FavoriteConditionalIcon like={like} />
          </div>
          <p className='flexBox__text'>{result.overview}</p>
        </div>
      </div>
    </li>
  );
};

export default ResultCard;
