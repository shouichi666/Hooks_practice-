import React, {
  useState,
  useContext,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { SearchIcon, ClearSharpIcon } from "../../asset/icons";
import theMovieDb from "themoviedb-javascript-library";
import AppContext from "../../hooks/contexts/AppContext";
import { useHistory } from "react-router-dom";

const HeaderSearch = (props) => {
  const history = useHistory();
  const { state, dispatch } = useContext(AppContext);
  const [candidate, setCandidate] = useState([]);
  const inputRef = useRef();

  let animationClassName = props.open
    ? "HeaderSearch-enter-done"
    : "HeaderSearch-exit-done";

  const onChangeSearch = useCallback(
    (e) => {
      e.preventDefault();
      const value = e.target.value;
      dispatch({ type: "SET_SEARCH_STRING", string: value });
      if (value.length > 1) {
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
      }
    },
    [dispatch]
  );

  const onClickCandidate = useCallback(
    (e) => {
      e.preventDefault();
      const value = e.target.id;
      dispatch({ type: "SET_SEARCH_STRING", string: value });
      setCandidate([]);
    },
    [dispatch]
  );

  const onClickSearch = (e) => {
    e.preventDefault();
    const string = state.search.string;
    dispatch({ type: "SET_SEARCH_WORDS", words: string });
    setCandidate([]);
    history.push("/search/movie");
  };

  const deleteForm = () => {
    dispatch({ type: "DELETE_SEARCH_STRING", string: "" });
  };

  useEffect(() => {
    if (props.open) inputRef.current.focus();
  });

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
          ref={inputRef}
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
