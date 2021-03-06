import React, { useState, useContext, useEffect } from "react";
import { MoreButton } from "./button";
import {
  POSTER_342,
  _findFromPepoleId,
  _registerDataPepole,
} from "../../hooks/hoge";
import { useHistory } from "react-router-dom";
import { CastDialogList } from ".";
import theMovieDb from "themoviedb-javascript-library";
import { PieChart } from ".";
import noPhoto from "../../asset/imags/no_500.png";
import AppContext from "../../hooks/contexts/AppContext";
import { db } from "../../firebase";

const CastCard = (props) => {
  const result = props.result;
  const history = useHistory();
  const { state, dispatch } = useContext(AppContext);
  const [open, setOpen] = useState(true);
  const [like, setLike] = useState(false);

  useEffect(() => {
    _findFromPepoleId(db, state.users.id, result, () => setLike(true));
  }, [result, state.users.id]);

  const onClickOpenDialog = () => setOpen(false);
  const onClickCloseDialog = () => setOpen(true);
  const jumpToCast = (e) => {
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
    history.push(`/cast/${result.name}`);
  };

  return (
    <li className='flexBox'>
      <div className='flexBox__left'>
        {result.profile_path !== null ? (
          <a href={`/cast/${result.name}`} onClick={jumpToCast}>
            <img src={POSTER_342 + result.profile_path} alt='' />
          </a>
        ) : (
          <img src={noPhoto} alt='no' />
        )}
        <div className='flexBox__review'>
          <PieChart
            width={window.innerWidth > 400 ? 45 : 25}
            height={window.innerWidth > 400 ? 45 : 25}
            inner={window.innerWidth > 400 ? 19 : 11}
            outer={window.innerWidth > 400 ? 23 : 13}
            review={result.popularity}
          />
          <span className='flexBox__review--num'>
            {Math.round(result.popularity * 10)}
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
          <CastDialogList
            top='10%'
            data={result}
            open={open}
            onClose={onClickCloseDialog}
            registerDataPepole={() =>
              _registerDataPepole(
                db,
                state.users.id,
                result,
                onClickCloseDialog
              )
            }
            like={like}
          />
          <MoreButton
            className={"flexBox__right--moreButton"}
            onClick={onClickOpenDialog}
          />
          <h3 className='flexBox__title'>
            <div onClick={jumpToCast}>{result.name}</div>
          </h3>
          <div className='flex-alignCenter'>
            {(result.known_for || []).map((t, i) => (
              <span className='flexBox__knowFor' key={i}>
                {t.title || t.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
};

export default CastCard;
