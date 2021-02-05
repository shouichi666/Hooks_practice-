import React, { useState, useEffect } from "react";
import RecommendSliderBox from "./RecommendSliderBox";
import theMovieDb from "themoviedb-javascript-library";

const RecommendSlider = () => {
  const [movies, setMovie] = useState(null);
  useEffect(() => {
    theMovieDb.movies.getSimilarMovies(
      { id: 464052 },
      (movie) => {
        const movies = JSON.parse(movie);
        setMovie(movies.results);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  if (movies !== null) {
    const mapSimilarMovies = movies.map((movie, i) => {
      return <RecommendSliderBox data={movie} />;
    });
    return (
      <section className="RecommendSlider">
        <h2 className="RecommendSlider__heading">オススメ {movies.length} 作</h2>
        <div className="RecommendSlider__slider">
          <div className="RecommendSlider__shadow"></div>
          <div className="RecommendSlider__list">
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
