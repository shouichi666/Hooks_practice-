import React from "react";
import theMovieDb from "themoviedb-javascript-library";
import { Link } from "react-router-dom";

const castSliderBox = (props) => {
  let data = props.cast;

  return (
    <Link to={`/movie/${data.id}`} id={data.name}>
      <div className='castSliderBox'>
        <img src={theMovieDb.common.images_uri + "w185" + data.profile_path} alt={data.profile_path} className='castSliderBox--img' />
        <p className='castSliderBox--name'>{data.name}</p>
        <p className='castSliderBox--charName'>{data.character}</p>
      </div>
    </Link>
  );
};

export default castSliderBox;
