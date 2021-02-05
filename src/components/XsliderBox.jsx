import React from "react";
import { Link } from "react-router-dom";
import sample from "../asset/imags/sample.jpg";

const XsliderBox = (props) => {
  return (
    <Link to="/">
      <div className="Xslider__list--item">
        <div className="Xslider__list--item--top">
          <img src={sample} alt={sample} className="Xslider__list--item--img" />
        </div>
        <div className="Xslider__list--item--bottom">
          <p>movie title</p>
          <p>date and time 2010/2/22</p>
        </div>
      </div>
    </Link>
  );
};

export default XsliderBox;
