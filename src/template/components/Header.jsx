import React, { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import HeaderSearch from "./HeaderSearch";
import { SearchButton, ClearButton, AccountButton } from "./button";

const Header = () => {
  const target = useRef(null);
  const [state, setState] = useState({
    hiddenHeader: false,
    openSearch: false,
  });
  const toggleOpenSearch = useCallback(
    () => setState({ ...state, openSearch: !state.openSearch }),
    [state]
  );
  let changeHeaderClass = state.hiddenHeader ? "header__up" : "header__down";

  return (
    <>
      <header className={`header ${changeHeaderClass}`} ref={target}>
        <div className='header__wrap'>
          <div className='header__logoWrap'>
            <Link to='/' className='header__logoWrap--logo'>
              MOVIE
            </Link>
          </div>
          <nav className='header__nav'>
            <Link to='/movie/list/popular' className='header__nav--link'>
              MOVIE
            </Link>
            <Link to='/tv/list/popular' className='header__nav--link'>
              TV
            </Link>
            <Link to='/cast/list' className='header__nav--link'>
              CAST
            </Link>
            <Link to='/fivorite' className='header__nav--link' hidden={false}>
              FAVORITE
            </Link>
            <Link to='/sign' className='header__nav--link'>
              SIGN IN
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
