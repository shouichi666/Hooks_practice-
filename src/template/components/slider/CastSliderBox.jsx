import React, { useCallback, useContext, useEffect, useState } from "react";
import theMovieDb from "themoviedb-javascript-library";
import { useHistory } from "react-router-dom";
import AppContext from "../../../hooks/contexts/AppContext";
import noImg from "../../../asset/imags/no_500.png";
import {
  POSTER_185,
  _registerDataPepole,
  _findFromPepoleId,
} from "../../../hooks/hoge";
import { db } from "../../../firebase";
import { MoreButton } from "../button";
import { CastDialogList } from "../";

const CastSliderBox = React.memo((props) => {
  const { state, dispatch } = useContext(AppContext);
  const [open, setOpen] = useState(true);
  const [like, setLike] = useState(false);
  const history = useHistory();
  let data = props.cast;

  useEffect(() => {
    _findFromPepoleId(db, state.users.id, data, () => setLike(true));
  }, [data, state]);

  const onClickToggleDialog = () => setOpen(!open);
  const onClickCloseDialog = () => setOpen(true);
  const onClick = useCallback(() => {
    theMovieDb.people.getById(
      { id: data.id },
      (cast) => {
        dispatch({
          type: "GET_CAST",
          cast: JSON.parse(cast),
        });
        history.push(`/cast/:${data.name}`);
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
  }, [dispatch, data.id, history, data.name]);

  return (
    <div id={data.id} className='castSliderBox'>
      {data.profile_path !== null ? (
        <img
          src={POSTER_185 + data.profile_path || noImg}
          alt={data.profile_path}
          className='castSliderBox--img'
          onClick={onClick}
          loading='lazy'
        />
      ) : (
        <img src={noImg} alt={noImg} />
      )}

      <p className='castSliderBox--name' onClick={onClick}>
        {data.name}
      </p>
      <p className='castSliderBox--charName' onClick={onClick}>
        {data.character}
      </p>
      <MoreButton
        className={"castSliderBox__moreButton"}
        onClick={onClickToggleDialog}
      />
      <CastDialogList
        data={data}
        onClose={onClickCloseDialog}
        open={open}
        bottom='10%'
        like={like}
        registerDataPepole={() =>
          _registerDataPepole(db, state.users.id, data, onClickCloseDialog)
        }
      />
    </div>
  );
});

export default CastSliderBox;
//
