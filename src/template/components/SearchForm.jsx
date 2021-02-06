import React, { useState } from "react";

const SearchForm = () => {
  const [text, setText] = useState("");
  const [focus, setFocus] = useState(false);
  const handleChangeText = (e) => setText(e.target.value);
  let changeClassName = focus ? "on" : "off";
  return (
    <form
      action="/"
      method="get"
      className={`SearchForm ${changeClassName}`}
      onClick={() => {
        setFocus(!focus);
      }}
    >
      <input
        className="SearchForm--input"
        type="text"
        id="firstViewInput"
        value={text}
        name="firstViewInput"
        onChange={handleChangeText}
        placeholder="movie or acter ..."
      />
      <span className="SearchForm--underBorder"></span>
      <span className="SearchForm--sideBorder"></span>
      <input className="SearchForm--submit" type="submit" value="Search" />
    </form>
  );
};

export default SearchForm;
