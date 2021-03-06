import React, { useState, useCallback, useContext } from "react";
import theMovieDb from "themoviedb-javascript-library";
import { useHistory } from "react-router-dom";
import { db } from "../../firebase";
import {
  POSTER_342,
  _deleteDbData,
  _registerDataRecent,
} from "../../hooks/hoge";
import DeleteIcon from "@material-ui/icons/Delete";

import AppContext from "../../hooks/contexts/AppContext";
import { DeleteDialogList } from "./";

const ItemBox = (props) => {
  const { state, dispatch } = useContext(AppContext);
  const [open, setOpen] = useState(true);
  const history = useHistory();
  const data = props.data;
  const onClick = useCallback(
    (e) => {
      _registerDataRecent(db, state.users.id, data);
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
    [history, data, dispatch, state.users.id]
  );

  const deleteData = () => {
    _deleteDbData(db, state.users.id, "history", data, clickCloseDialigList);
  };

  const clickToggleDialigList = () => {
    setOpen(!open);
  };

  const clickCloseDialigList = () => {
    setOpen(!open);
  };
  return (
    <>
      <div className='ItemBox'>
        <DeleteDialogList
          open={open}
          onClose={clickCloseDialigList}
          deleteData={deleteData}
          data={data}
          top='20%'
          left={0}
        />
        <img
          src={POSTER_342 + data.poster_path}
          alt={data.poster_path}
          className='ItemBox__img'
          loading='lazy'
          id={data.id}
          onClick={onClick}
        />

        <button
          className={"ItemBox__moreButton"}
          onClick={clickToggleDialigList}
        >
          <DeleteIcon />
        </button>
      </div>
    </>
  );
};

export default ItemBox;
