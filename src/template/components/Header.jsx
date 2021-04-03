import React, {
  useState,
  useRef,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { Link } from "react-router-dom";
import { HeaderSearch, LogOutModal} from "./";
import { SearchButton, ClearButton, AccountButton } from "./button";
import AppContext from "../../hooks/contexts/AppContext";
import { auth, db } from "../../firebase/";

const Header = () => {
  const { state, dispatch } = useContext(AppContext);
  const target = useRef(null);
  const [open, setOpen] = useState(false);
  const [bar, setBar] = useState({
    hiddenHeader: false,
    openSearch: false,
  });

  const [userName, setUserName] = useState("");
  const toggleOpenSearch = useCallback(
    () => setBar({ ...bar, openSearch: !bar.openSearch }),
    [bar]
  );
  const closeSearch = useCallback(() => setBar({ ...bar, openSearch: false }), [
    bar,
  ]);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  let changeHeaderClass = bar.hiddenHeader ? "header__up" : "header__down";

  const logOut = () => {
    console.log("log out");
    auth.signOut();
    dispatch({ type: "SIGN_OUT" });
    setOpen(false);
  };

  useEffect(() => {
    db.ref("users/" + state.users.id + "/userName").on("value", (data) => {
      setUserName(data.val());
    });
  }, [state.users.id]);

  return (
    <>
      <div
        hidden={!bar.openSearch}
        onClick={closeSearch}
        className='coverSheets'
      ></div>
      <header className={`header ${changeHeaderClass}`} ref={target}>
        <div className='header__wrap'>
          <div className='header__logoWrap'>
            <Link to='/' className='header__logoWrap--logo'>
              M&T
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
            <Link
              to='/favorite'
              className='header__nav--link'
              hidden={!state.users.isSignIn}
            >
              <AccountButton />
              <p className='header__nav--link-userName'>{userName}</p>
            </Link>

            {state.users.isSignIn ? (
              <button className='header__nav--link' onClick={openModal}>
                SIGN OUT
              </button>
            ) : (
              <Link to='/sign' className='header__nav--link'>
                SIGN IN
              </Link>
            )}
          </nav>
          <nav className='header__nav--sp'>
            <Link to='/movie/list/popular' className='header__nav--link'>
              MOVIE
            </Link>
            <Link to='/tv/list/popular' className='header__nav--link'>
              TV
            </Link>
            <Link to='/cast/list' className='header__nav--link'>
              CAST
            </Link>
            <Link
              to='/favorite'
              className='header__nav--link'
              hidden={!state.users.isSignIn}
            >
              <AccountButton />
            </Link>

            {state.users.isSignIn ? null : (
              <Link to='/sign' className='header__nav--link'>
                SIGN IN
              </Link>
            )}
          </nav>

          {bar.openSearch ? (
            <ClearButton onClick={toggleOpenSearch} />
          ) : (
            <SearchButton onClick={toggleOpenSearch} />
          )}
        </div>
        <LogOutModal open={open} closeModal={closeModal} logOut={logOut} />
        <HeaderSearch open={bar.openSearch} />
      </header>
    </>
  );
};

export default Header;
