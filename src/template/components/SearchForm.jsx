import React, { useContext, useState } from "react";
import AppContext from "../../hooks/contexts/AppContext";
import theMovieDb from "themoviedb-javascript-library";
import { useHistory } from "react-router-dom";

const SearchForm = () => {
  const history = useHistory();
  const { dispatch } = useContext(AppContext);
  const [string, setString] = useState("");
  const [focus, setFocus] = useState(false);
  let changeClassName = focus ? "on" : "off";

  const handleChangeText = (e) => setString(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_SEARCH_STRING", string: string });
    theMovieDb.search.getMulti(
      { query: string },
      (result) => {
        dispatch({ type: "SET_SEARCH_ITEMS", data: JSON.parse(result) });
      },
      (error) => {
        console.log(error);
      }
    );
    history.push("/search/movie");
  };

  const isClerField = (e) => {
    e.preventDefault();
    dispatch({ type: "DELETE_SEARCH_STRING" });
  };

  return (
    <form
      className={`SearchForm ${changeClassName}`}
      onClick={() => {
        setFocus(!focus);
      }}
      onSubmit={onSubmit}
    >
      <input
        className='SearchForm--input'
        type='text'
        id='firstViewInput'
        value={string}
        tabIndex='1'
        onChange={handleChangeText}
        placeholder='映画名、テレビ番組名、人物名で検索'
      />
      <span className='SearchForm--underBorder'></span>
      <span className='SearchForm--sideBorder'></span>
      <button className='SearchForm--deleteButton' onClick={isClerField}>
        <span className='SearchForm--boder'>del</span>
      </button>
      <input
        className='SearchForm--submit'
        type='submit'
        value='Search'
        disabled={string === "" ? true : false}
      />
    </form>
  );
};

export default SearchForm;
