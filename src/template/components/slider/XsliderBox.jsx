import React, { useState, useCallback, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import theMovieDb from "themoviedb-javascript-library";
import AppContext from "../../../hooks/contexts/AppContext";
import { PieChart } from "../";
import {
  POSTER_342,
  TIMESTAMP,
  _registerDataFavorite,
  _registerDataWatchLater,
  _registerDataRecent,
  _findFromFavoriteId,
  _findFromWatchLaterId,
} from "../../../hooks/hoge";
import { db } from "../../../firebase";
import { MoreButton } from "../button";
import { MovieDialogList, FavoriteConditionalIcon } from "../";

const XsliderBox = React.memo((props) => {
  const { state, dispatch } = useContext(AppContext);
  const [favorite, setFavorite] = useState(false);
  const [watch, setWatch] = useState(false);
  const [open, setOpen] = useState(true);
  const history = useHistory();
  const data = props.data;
  // console.log(data);

  useEffect(() => {
    setFavorite(false);
  }, [props]);

  const onClick = useCallback(
    (e) => {
      data.time_stamp = TIMESTAMP;
      if (state.users.isSignIn) _registerDataRecent(db, state.users.id, data);
      const id = e.target.id;
      if (data.adult === false || data.adult) {
        theMovieDb.movies.getById(
          { id: id },
          (movie) => {
            dispatch({ type: "GET_MOVIE", data: JSON.parse(movie) });
            history.push(`/movie/${id}`);
          },
          (error) => {
            console.log(error);
          }
        );
        theMovieDb.movies.getKeywords(
          { id: id },
          (movie) => {
            dispatch({ type: "GET_KEYWORD", data: JSON.parse(movie).keywords });
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        theMovieDb.tv.getById(
          { id: id },
          (tv) => {
            dispatch({ type: "GET_TV", data: JSON.parse(tv) });
            history.push(`/tv/${id}`);
          },
          (error) => {
            console.log(error);
          }
        );
        theMovieDb.tv.getKeywords(
          { id: id },
          (tv) => {
            dispatch({ type: "GET_KEYWORD", data: JSON.parse(tv).results });
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
    [history, data, dispatch, state.users]
  );

  useEffect(() => {
    _findFromFavoriteId(db, state.users.id, data, () => setFavorite(true));
    _findFromWatchLaterId(db, state.users.id, data, () => setWatch(true));
  }, [data, state.users.id]);

  const clickToggleDialigList = () => setOpen(!open);

  const clickCloseDialigLIst = () => setOpen(true);

  return (
    <div className='sliderBox'>
      <FavoriteConditionalIcon
        like={favorite}
        className={"sliderBox__likeIcon"}
      />
      <MovieDialogList
        bottom='10%'
        right='0px'
        open={open}
        onClose={clickCloseDialigLIst}
        data={data}
        registerDataFavorite={() =>
          _registerDataFavorite(db, state.users.id, data, clickCloseDialigLIst)
        }
        registerDataWatchLater={() =>
          _registerDataWatchLater(
            db,
            state.users.id,
            data,
            clickCloseDialigLIst
          )
        }
        favorite={favorite}
        watch={watch}
      />

      <div className='sliderBox__top'>
        <div className='sliderBox__imgBox'>
          <img
            src={POSTER_342 + data.poster_path}
            alt={data.poster_path}
            className='sliderBox__imgBox--img'
            loading='lazy'
            id={data.id}
            onClick={onClick}
          />
        </div>
        <div className='sliderBox__review'>
          <p className='sliderBox__review--number'>
            {data.vote_average * 10}
            <small className='sliderBox__review--number--per'>%</small>
          </p>
          <PieChart
            review={data.vote_average}
            inner={15}
            outer={16.5}
            width={40}
            height={40}
          />
        </div>
      </div>

      <p className='sliderBox__title' id={data.id} onClick={onClick}>
        {data.title || data.name}
      </p>

      <MoreButton
        className={"sliderBox__moreButton"}
        onClick={clickToggleDialigList}
      />

      <time className='sliderBox__date'>
        {data.release_date || data.first_air_date}
      </time>
    </div>
  );
});

export default XsliderBox;
