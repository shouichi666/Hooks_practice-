import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import HeaderSearch from "./HeaderSearch";
import { SearchButton, ClearButton, AccountButton } from "./button";

const Header = () => {
  const target = useRef(null);
  const [state, setState] = useState({
    headerElement: "",
    hiddenHeader: false,
    openSearch: false,
  });

  const toggleOpenSearch = () =>
    setState({ ...state, openSearch: !state.openSearch });

  useEffect(() => {
    setState({ ...state, headerElement: target.current });
  }, []);

  let changeHeaderClass = state.hiddenHeader ? "header__up" : "header__down";
  //
  //
  //
  return (
    <>
      <header className={`header ${changeHeaderClass}`} ref={target}>
        <div className="header__wrap">
          <div className="header__logoWrap">
            <Link to="/" className="header__logoWrap--logo">
              MOVIE
            </Link>
          </div>
          <nav className="header__nav">
            <Link to="/favorite" className="header__nav--link" hidden={true}>
              Favrite List
            </Link>
            <Link to="/sign" className="header__nav--link">
              Sign In
            </Link>
            <div hidden={true}>
              <AccountButton />
            </div>
          </nav>
          {state.openSearch ? (
            <ClearButton onClick={toggleOpenSearch} />
          ) : (
            <SearchButton onClick={toggleOpenSearch} />
          )}
        </div>
        <HeaderSearch open={state.openSearch} />
      </header>
    </>
  );
};

export default Header;
