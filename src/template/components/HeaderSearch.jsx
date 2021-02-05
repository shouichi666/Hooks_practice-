import React, { useState } from "react";
import { SearchIcon, ClearSharpIcon } from "../../asset/icons";

const HeaderSearch = (props) => {
  const [text, setText] = useState("");

  //func
  const handleChange = (e) => setText(e.target.value);
  const deleteForm = () => setText("");

  let animationClassName = props.open
    ? "HeaderSearch-enter-done"
    : "HeaderSearch-exit-done";
  //
  //
  //
  return (
    <div className={`HeaderSearch ${animationClassName}`}>
      <form className="HeaderSearch__form" action="/search" method="get">
        <label htmlFor="headerSearch" className="HeaderSearch__label">
          <SearchIcon fontSize="large" />
        </label>
        <input
          id="headerSearch"
          className="HeaderSearch__input"
          type="text"
          name="query"
          tabIndex="1"
          autoCorrect="off"
          autofill="off"
          autoComplete="off"
          placeholder="映画名、テレビ番組名、人物名で検索"
          value={text}
          onChange={handleChange}
        />
        <div className="HeaderSearch__icon" onClick={deleteForm}>
          <ClearSharpIcon color="action" />
        </div>
      </form>
    </div>
  );
};

export default HeaderSearch;
