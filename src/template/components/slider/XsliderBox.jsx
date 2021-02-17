import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import theMovieDb from "themoviedb-javascript-library";
import AppContext from "../../../hooks/contexts/AppContext";
import { PieChart } from "../";
import { POSTER_185 } from "../../../hooks/hoge";

const XsliderBox = (props) => {
  const { dispatch } = useContext(AppContext);
  const history = useHistory();
  const data = props.data;

  const onClick = (e) => {
    const name = e.target.name;
    const id = e.target.id;
    dispatch({ type: "SET_TYPE", searchType: name });

    if (data.adult === false || data.adult) {
      theMovieDb.movies.getById(
        { id: id },
        (movie) => {
          dispatch({ type: "GET_MOVIE", data: JSON.parse(movie) });
        },
        (error) => {
          console.log(error);
        }
      );
      theMovieDb.movies.getKeywords(
        { id: id },
        (movie) => {
          console.log(movie);
          dispatch({ type: "GET_KEYWORD", data: JSON.parse(movie).keywords });
        },
        (error) => {
          console.log(error);
        }
      );
      history.push(`/movie/${id}`);
    } else {
      theMovieDb.tv.getById(
        { id: id },
        (tv) => {
          dispatch({ type: "GET_TV", data: JSON.parse(tv) });
        },
        (error) => {
          console.log(error);
        }
      );
      theMovieDb.tv.getKeywords(
        { id: id },
        (tv) => {
          console.log(tv);
          dispatch({ type: "GET_KEYWORD", data: JSON.parse(tv).results });
        },
        (error) => {
          console.log(error);
        }
      );
      history.push(`/tv/${id}`);
    }
  };

  return (
    <Link className='sliderBox' id={data.id} onClick={onClick} name={props.judge}>
      <div className='sliderBox__top'>
        <img
          src={POSTER_185 + data.poster_path}
          alt={data.poster_path}
          className='sliderBox__img'
        />
        <div className='sliderBox__review'>
          <p className='sliderBox__review--number'>
            {data.vote_average * 10}
            <small className='sliderBox__review--number--per'>%</small>
          </p>
          <PieChart
            review={data.vote_average}
            inner={15}
            outer={16.5}
            width={40}
            height={40}
          />
        </div>
      </div>
      <p className='sliderBox__title'>{data.title || data.name}</p>
      <time className='sliderBox__date'>{data.release_date || data.first_air_date}</time>
    </Link>
  );
};

export default XsliderBox;
