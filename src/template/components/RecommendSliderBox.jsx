import React from "react";
import theMovieDb from "themoviedb-javascript-library";
import { Link } from "react-router-dom";

const RecommendSliderBox = (props) => {
  let data = props.data;

  return (
    <Link to={`/movie/${data.id}`}  id={data.title}>
      <div className="RecommendSlider__list--item">
        <div className="RecommendSlider__list--item--top">
          <img
            src={theMovieDb.common.images_uri + "w185" + data.poster_path}
            alt={data.poster_path}
            className="RecommendSlider__list--item--img"
          />
        </div>
        <div className="RecommendSlider__list--item--bottom">
          <p>{data.title}</p>
          {/* <p>{data.character}</p> */}
        </div>
      </div>
    </Link>
  );
};

export default RecommendSliderBox;
