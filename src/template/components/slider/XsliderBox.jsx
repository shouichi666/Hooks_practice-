import React, { useContext } from "react";
import { Link } from "react-router-dom";
import theMovieDb from "themoviedb-javascript-library";
import AppContext from "../../../hooks/contexts/AppContext";
import { PieChart } from "../";

const XsliderBox = (props) => {
  const { dispatch } = useContext(AppContext);
  const data = props.data;
  const onClick = (e) => {
    const id = e.target.id;
    theMovieDb.movies.getById(
      { id: id },
      (movie) => {
        const data = JSON.parse(movie);
        dispatch({ type: "GET_ID_MOVIE", data: data });
      },
      (error) => {
        console.log(error);
      }
    );
    theMovieDb.movies.getKeywords(
      { id: id },
      (movie) => {
        const keyword = JSON.parse(movie);
        dispatch({ type: "GET_KEYWORD", data: keyword.keywords });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <Link className='sliderBox' to={`/movie/${data.id}`} id={data.id} onClick={onClick}>
      <div className='sliderBox__top'>
        <img
          src={theMovieDb.common.images_uri + "w185" + data.poster_path}
          alt={data.poster_path}
          className='sliderBox__img'
        />
        <div className='sliderBox__review'>
          <p className='sliderBox__review--number'>
            {data.vote_average * 10}
            <span className='sliderBox__review--number--per'>%</span>
          </p>
          <PieChart
            review={data.vote_average}
            inner={14}
            outer={15}
            width={40}
            height={40}
          />
        </div>
      </div>
      <p className='sliderBox__title'>{data.title}</p>
      <p className='sliderBox__date'>{data.release_date}</p>
    </Link>
  );
};

export default XsliderBox;
