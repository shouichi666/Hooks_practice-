import React, { useState } from "react";

const Footer = () => {
  const [text, setText] = useState(true);
  const oo = () => {
    setText(!text);
  };

  return (
    <footer className="footer">
      <div className="footer__wrap">
        <button className="footer__button" onClick={oo}>
          {text ? "Sign In" : "HELLO User Name"}
        </button>
        Sign In or User Name
        <p>MOVIE</p>
      </div>
    </footer>
  );
};

export default Footer;
