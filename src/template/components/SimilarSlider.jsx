import React, { useState, useContext } from "react";
import RecommendSliderBox from "./SimilarSliderBox";
import theMovieDb from "themoviedb-javascript-library";
import AppContext from "../../hooks/contexts/AppContext";

const RecommendSlider = () => {
  const { state } = useContext(AppContext);
  const [movies, setMovie] = useState(null);

  if (movies === null) {
    theMovieDb.movies.getSimilarMovies(
      { id: state.movie.viewItem.id },
      (movie) => {
        const movies = JSON.parse(movie);
        setMovie(movies.results);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  if (movies !== null) {
    const mapSimilarMovies = movies.map((movie, i) => {
      return <RecommendSliderBox data={movie} />;
    });
    return (
      <section className="SimilarSlider">
        <h2 className="SimilarSlider__heading">似ている映画 {movies.length} 作</h2>
        <div className="SimilarSlider__slider">
          <div className="SimilarSlider__shadow"></div>
          <div className="SimilarSlider__list">
            <div></div>
            {mapSimilarMovies}
          </div>
        </div>
      </section>
    );
  } else {
    return <h1>fuck</h1>;
  }
};

export default RecommendSlider;
