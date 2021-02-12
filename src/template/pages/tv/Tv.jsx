import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { PieChart } from "../../components";
import { CastSliderBox, Xslider, XsliderBox } from "../../components/slider";
import AppContext from "../../../hooks/contexts/AppContext";
import theMovieDb from "themoviedb-javascript-library";
import { POSTER_342, BACKDROP_780 } from "../../../hooks/hoge";

const Tv = () => {
  // const history = useHistory();
  const { state } = useContext(AppContext);
  const [movies, setMovie] = useState([]);
  const [casts, setCasts] = useState(null);
  const data = state.tv.viewItem;
  const lang = data.original_language;
  const keywords = state.tv.keyword;
  let originalLanguage;
  const style = {
    backgroundImage: `url(${BACKDROP_780 + data.backdrop_path})`,
    backgroundSize: "cover",
    backgroundPosition: "right -200px top",
  };

  const getMovie = () => {
    theMovieDb.movies.getCredits(
      { id: state.tv.viewItem.id },
      (movie) => {
        const cast = JSON.parse(movie);
        setCasts(cast.cast);
      },
      (error) => {
        console.log(error);
        // history.push("/");
      }
    );
    theMovieDb.movies.getSimilarMovies(
      { id: state.tv.viewItem.id },
      (movie) => {
        const movies = JSON.parse(movie);
        setMovie(movies.results);
      },
      (error) => {
        console.log(error);
        // history.push("/");
      }
    );
  };
  const windowTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(getMovie, [state]);
  useEffect(windowTop, [state]);

  if (lang === "en") {
    originalLanguage = "ENGLISH";
  } else if (lang === "ja") {
    originalLanguage = "日本語";
  } else if (lang === "ko") {
    originalLanguage = "韓国語";
  } else {
    originalLanguage = lang;
  }

  return (
    <main id='movie' className='Movie'>
      <section className='Movie__firstView' style={style}>
        <div className='Movie__posterWrap'>
          <img src={POSTER_342 + data.poster_path} alt={data.poster_path} />
        </div>

        <div className='Movie__discriptionWrap'>
          <div className='Movie__discriptionWrap--top'>
            <h2 className='Movie__discriptionWrap--top--title'>
              {data.title || data.name} tv {/* 作品タイトル */}
            </h2>
            <div className='Movie__discriptionWrap--top--flex'>
              <span>{data.release_date}</span>
              {(data.genres || []).map((genre, i) => (
                <Link to={`/${genre.id}`} key={i} id={genre.id}>
                  <span>{genre.name},</span>
                </Link>
              ))}
              <span>{data.runtime + "minits"}</span>
            </div>
          </div>

          <div className='Movie__discriptionWrap--mid'>
            <div className='Movie__discriptionWrap--mid--score score'>
              <PieChart
                width={73}
                height={73}
                inner={30}
                outer={33}
                review={data.vote_average}
              />
              <div className='scoreCircle'>
                {data.vote_average * 10}
                <span className='scoreCircle__amount'>%</span>
              </div>
            </div>
            <p>ユーザースコア</p>
            <h3 className='Movie__discriptionWrap--mid--tanline'>{data.tagline}</h3>
          </div>

          <div className='Movie__discriptionWrap--bottom'>
            <h3 className='Movie__discriptionWrap--bottom'>概要</h3>
            <p>{data.overview}</p>
          </div>
        </div>
      </section>

      <div className='twoColoum'>
        <div className='MovieMainContents'>
          <Xslider heading='キャスト'>
            {(casts || []).map((cast, i) => {
              return <CastSliderBox cast={cast} key={i} />;
            })}
          </Xslider>
          <Xslider heading={`同ジャンル ${movies.length} 作品`}>
            {(movies || []).map((movie, i) => {
              return <XsliderBox data={movie} judge={state.common.searchType} key={i} />;
            })}
          </Xslider>
        </div>

        <aside className='aside'>
          <dl className='aside__top'>
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

          <div className='aside__buttom'>
            <h4>キーワード</h4>
            <div className='aside__bottom--flex'>
              {(keywords || []).map((key, i) => (
                <Link key={i} to={key.name}>
                  {key.name}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
  // } else {
  //   return <h1>tt</h1>;
  // }
};

export default Tv;
