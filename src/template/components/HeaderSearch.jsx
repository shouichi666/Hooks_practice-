import React, { useState, useContext } from "react";
import { SearchIcon, ClearSharpIcon } from "../../asset/icons";
import theMovieDb from "themoviedb-javascript-library";
import AppContext from "../../hooks/contexts/AppContext";
import { useHistory } from "react-router-dom";

const HeaderSearch = (props) => {
  const history = useHistory();
  const { state, dispatch } = useContext(AppContext);
  const [candidate, setCandidate] = useState([]);

  let animationClassName = props.open
    ? "HeaderSearch-enter-done"
    : "HeaderSearch-exit-done";

  const onChangeSearch = (e) => {
    const value = e.target.value;
    dispatch({ type: "SET_SEARCH_STRING", string: value });
    theMovieDb.search.getMulti(
      { query: value },
      (result) => {
        const getMovies = JSON.parse(result);
        const newArray = getMovies.results.slice(0, 10);
        setCandidate(newArray);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const onClickCandidate = (e) => {
    const value = e.target.id;
    console.log(value);
    dispatch({ type: "SET_SEARCH_STRING", string: value });
    theMovieDb.search.getMulti(
      { query: value, include_adult: true },
      (result) => {
        dispatch({ type: "SET_SEARCH_ITEMS", data: JSON.parse(result) });
      },
      (error) => {
        console.log(error);
      }
    );
    setCandidate([]);
    history.push("/search/movie");
  };

  const onClickSearch = (e) => {
    e.preventDefault();
    const value = state.search.string;
    theMovieDb.search.getMulti(
      { query: value, include_adult: true },
      (result) => {
        dispatch({ type: "SET_ALL_SEARCH_ITEMS", data: JSON.parse(result) });
      },
      (error) => {
        console.log(error);
      }
    );
    setCandidate([]);
    history.push("/search/movie");
  };

  const deleteForm = () => {
    dispatch({ type: "DELETE_SEARCH_STRING", string: "" });
  };
  //
  //
  //
  return (
    <div className={`HeaderSearch ${animationClassName}`}>
      <form className='HeaderSearch__form' onSubmit={onClickSearch}>
        <button htmlFor='headerSearch' className='HeaderSearch__label'>
          <SearchIcon fontSize='large' />
        </button>
        <input
          id='headerSearch'
          className='HeaderSearch__input'
          type='text'
          name='query'
          tabIndex='1'
          autoCorrect='off'
          autofill='off'
          autoComplete='off'
          placeholder='映画名、テレビ番組名、人物名で検索'
          value={state.search.string}
          onChange={onChangeSearch}
        />
        <div className='HeaderSearch__icon' onClick={deleteForm}>
          <ClearSharpIcon color='primary' />
        </div>
      </form>
      <ul className='HeaderSearch__candidateList'>
        {state.search.string !== ""
          ? candidate.map((data, index) => {
              return (
                <li
                  key={index}
                  id={data.name || data.title}
                  onClick={onClickCandidate}
                  value={data.name || data.title}
                >
                  {data.name || data.title}
                </li>
              );
            })
          : ""}
      </ul>
    </div>
  );
};

export default HeaderSearch;
