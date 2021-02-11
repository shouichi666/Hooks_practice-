import React, { useState } from "react";

const SearchForm = () => {
  const [text, setText] = useState("");
  const [focus, setFocus] = useState(false);
  const handleChangeText = (e) => setText(e.target.value);
  let changeClassName = focus ? "on" : "off";

  const isClerField = (e) => {
    e.preventDefault();
    setText("");
  };

  return (
    <form
      action='/'
      method='get'
      className={`SearchForm ${changeClassName}`}
      onClick={() => {
        setFocus(!focus);
      }}
    >
      <input
        className='SearchForm--input'
        type='text'
        id='firstViewInput'
        value={text}
        name='firstViewInput'
        tabIndex='1'
        onChange={handleChangeText}
        placeholder="映画名、テレビ番組名、人物名で検索'"
      />
      <span className='SearchForm--underBorder'></span>
      <span className='SearchForm--sideBorder'></span>
      <button className='SearchForm--deleteButton' onClick={isClerField}>
        <span className='SearchForm--boder'>del</span>
      </button>
      <input className='SearchForm--submit' type='submit' value='Search' />
    </form>
  );
};

export default SearchForm;
