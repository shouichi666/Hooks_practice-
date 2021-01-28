import React from "react";
// import { Link } from "react-router";

const Header = () => {
  return (
    <header className="header">
      <div className="header__logoWrap">
        <span className="header__logoWrap--logo">MOVIE</span>
      </div>
      <nav className="header__nav">
        <button to="#" className="header__nav--btn">Favrite List</button>
        <button to="#" className="header__nav--btn">Log In</button>
        {/* <Link to="#">Favrite List</Link>
        <Link to="#">Log In</Link>
        <Link to="#">Sign Up</Link> */}
      </nav>
    </header>
  );
};

export default Header;
