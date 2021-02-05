import React from "react";
import theMovieDb from "themoviedb-javascript-library";
import { Link } from "react-router-dom";

const castSliderBox = (props) => {
  let data = props.cast;

  return (
    <Link to={`/movie/${data.id}`}  id={data.name}>
      <div className="castSlider__list--item">
        <div className="castSlider__list--item--top">
          <img
            src={theMovieDb.common.images_uri + "w185" + data.profile_path}
            alt={data.profile_path}
            className="castSlider__list--item--img"
          />
        </div>
        <div className="castSlider__list--item--bottom">
          <p>{data.name}</p>
          <p>{data.character}</p>
        </div>
      </div>
    </Link>
  );
};

export default castSliderBox;
