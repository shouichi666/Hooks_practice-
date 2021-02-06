import React, { useState, useContext } from "react";
import AppContext from "../../hooks/contexts/AppContext";
import CastSliderBox from "./CastSliderBox";
import theMovieDb from "themoviedb-javascript-library";

const CastSlider = () => {
  const { state } = useContext(AppContext);
  const [casts, setCasts] = useState(null);

  if (casts === null) {
    theMovieDb.movies.getCredits(
      { id: state.movie.viewItem.id },
      (movie) => {
        const cast = JSON.parse(movie);
        setCasts(cast.cast);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  if (casts !== null) {
    const mapCasts = casts.map((cast, i) => {
      return <CastSliderBox cast={cast} />;
    });

    return (
      <section className="castSlider">
        <h2 className="castSlider__heading">出演キャスト</h2>
        <div className="castSlider__slider">
          <div className="castSlider__shadow"></div>
          <div className="castSlider__list">
            <div></div>
            {mapCasts}
          </div>
        </div>
      </section>
    );
  } else {
    return <h1>fuck</h1>;
  }
};

export default CastSlider;
