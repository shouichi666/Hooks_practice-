import React, { useContext } from "react";
import { Link } from "react-router-dom";
import theMovieDb from "themoviedb-javascript-library";
import CastSlider from "../components/CastSlider";
import RecommendSlider from "../components/SimilarSlider";
import AppContext from "../../hooks/contexts/AppContext";

const Movie = () => {
  const { state } = useContext(AppContext);
  const data = state.movie.viewItem;
  const keywords = state.movie.keyword;
  const imgPath = theMovieDb.common.images_uri;

  const mapKeyword = keywords.map((key, i) => {
    return (
      <Link key={i} to={key.name}>
        {key.name}
      </Link>
    );
  });

  if (Object.keys(data).length !== 0) {
    const lang = data.original_language;
    let originalLanguage;

    if (lang === "en") {
      originalLanguage = "ENGLISH";
    } else if (lang === "ja") {
      originalLanguage = "日本語";
    } else if (lang === "ko") {
      originalLanguage = "韓国語";
    } else {
      originalLanguage = lang;
    }
    const genres = data.genres.map((genre, i) => {
      return (
        <Link to={`/${genre.id}`} key={i} id={genre.id}>
          <span>{genre.name},</span>
        </Link>
      );
    });

    const img = imgPath + "w780/" + data.backdrop_path;

    const style = {
      backgroundImage: `url(${img})`,
      backgroundSize: "cover",
      backgroundPosition: "right -200px top",
    };

    return (
      <main id="movie" className="Movie">
        <section className="Movie__firstView" style={style}>
          <div className="Movie__posterWrap">
            <img
              src={imgPath + "w342/" + data.poster_path}
              alt={data.poster_path}
            />
          </div>

          <div className="Movie__discriptionWrap">
            <div className="Movie__discriptionWrap--top">
              <h2 className="Movie__discriptionWrap--top--title">
                {data.title}
              </h2>
              <div className="Movie__discriptionWrap--top--flex">
                <span>{data.release_date}</span>
                {genres}
                <span>{data.runtime + "minits"}</span>
              </div>
            </div>

            <div className="Movie__discriptionWrap--mid">
              <div className="Movie__discriptionWrap--mid--score score">
                <div
                  className="scoreCircle"
                  data-percent={data.vote_average * 10}
                >
                  {data.vote_average * 10}
                  <spna className="scoreCircle__amount">%</spna>
                </div>
              </div>
              <p>ユーザースコア</p>
              <h3 className="Movie__discriptionWrap--mid--tanline">
                {data.tagline}
              </h3>
            </div>

            <div className="Movie__discriptionWrap--bottom">
              <h3 className="Movie__discriptionWrap--bottom">概要</h3>
              <p>{data.overview}</p>
            </div>
          </div>
        </section>

        <div className="twoColoum">
          <div className="MovieMainContents">
            <section className="Movie__sliderContaner">
              <CastSlider />
            </section>

            <section className="Movie__sliderContaner">
              <RecommendSlider />
            </section>
          </div>

          <aside className="aside">
            <dl className="aside__top">
              <dt>原題</dt>
              <dd>{data.original_title}</dd>
              <dt>公開状態</dt>
              <dd>公開状態</dd>
              <dt>オリジナル言語</dt>
              <dd>{originalLanguage}</dd>
              <dt>予算</dt>
              <dd>${data.budget}</dd>
              <dt>収益</dt>
              <dd>${data.revenue}</dd>
            </dl>

            <div className="aside__buttom">
              <h4>キーワード</h4>
              <div className="aside__bottom--flex">{mapKeyword}</div>
            </div>
          </aside>
        </div>
      </main>
    );
  } else {
    return <h1>tt</h1>;
  }
};

export default Movie;
