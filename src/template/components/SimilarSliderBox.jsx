import React from "react";
import theMovieDb from "themoviedb-javascript-library";
import { Link } from "react-router-dom";

const SimilarSliderBox = (props) => {
  let data = props.data;

  return (
    <Link to={`/movie/${data.id}`} id={data.title}>
      <div className="SimilarSlider__list--item">
        <div className="SimilarSlider__list--item--top">
          <img
            src={theMovieDb.common.images_uri + "w185" + data.poster_path}
            alt={data.poster_path}
            className="SimilarSlider__list--item--img"
          />
        </div>
        <div className="SimilarSlider__list--item--bottom">
          <p>{data.title}</p>
          {/* <p>{data.character}</p> */}
        </div>
      </div>
    </Link>
  );
};

export default SimilarSliderBox;
