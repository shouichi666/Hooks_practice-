import React, { useCallback, useContext } from "react";
import theMovieDb from "themoviedb-javascript-library";
import { Link } from "react-router-dom";
import AppContext from "../../../hooks/contexts/AppContext";
import noImg from "../../../asset/imags/no_500.png";
import { POSTER_185 } from "../../../hooks/hoge";

const CastSliderBox = (props) => {
  const { dispatch } = useContext(AppContext);
  let data = props.cast;

  const onClick = useCallback(() => {
    theMovieDb.people.getById(
      { id: data.id },
      (cast) => {
        dispatch({
          type: "GET_CAST",
          cast: JSON.parse(cast),
        });
      },
      (error) => {
        console.error(error);
      }
    );
    theMovieDb.people.getCredits(
      { id: data.id },
      (work) => {
        dispatch({ type: "GET_CAST_WORK", work: JSON.parse(work) });
      },
      (error) => {
        console.log(error);
      }
    );
  }, [dispatch, data.id]);

  return (
    <Link
      to={`/cast/:${data.name}`}
      id={data.id}
      className='castSliderBox'
      onClick={onClick}
    >
      {data.profile_path !== null ? (
        <img
          src={POSTER_185 + data.profile_path || noImg}
          alt={data.profile_path}
          className='castSliderBox--img'
          loading='lazy'
        />
      ) : (
        <img src={noImg} alt={noImg} />
      )}

      <p className='castSliderBox--name'>{data.name}</p>
      <p className='castSliderBox--charName'>{data.character}</p>
    </Link>
  );
};

export default CastSliderBox;
//
