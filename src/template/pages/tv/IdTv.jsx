import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PieChart } from "../../components";
import { CastSliderBox, Xslider, XsliderBox } from "../../components/slider";
import AppContext from "../../../hooks/contexts/AppContext";
import theMovieDb from "themoviedb-javascript-library";
import {
  POSTER_342,
  BACKDROP_780,
  ChangeLanguage,
  _WindowTop,
} from "../../../hooks/hoge";

const IdTv = () => {
  // const history = useHistory();
  const { state } = useContext(AppContext);
  const [movies, setMovie] = useState([]);
  const [casts, setCasts] = useState(null);
  const data = state.tv.viewItem;
  const style = {
    backgroundImage: `url(${BACKDROP_780 + data.backdrop_path})`,
    backgroundSize: "cover",
    backgroundPosition: "right -200px top",
  };

  const getMovie = () => {
    theMovieDb.tv.getCredits(
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
    theMovieDb.tv.getSimilar(
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

    // theMovieDb.tv.getExternalIds(
    //   { id: state.tv.viewItem.id },
    //   (movie) => {
    //     console.log(movie);
    //   },
    //   (error) => {
    //     console.log(error);
    //     // history.push("/");
    //   }
    // );
  };

  useEffect(getMovie, [state]);
  useEffect(_WindowTop, [state]);

  return (
    <main id='movie' className='Movie'>
      <section className='Movie__firstView' style={style}>
        <div className='Movie__posterWrap'>
          <img src={POSTER_342 + data.poster_path} alt={data.poster_path} />
        </div>

        <div className='Movie__discriptionWrap'>
          <div className='Movie__discriptionWrap--top'>
            <h2 className='Movie__discriptionWrap--top--title'>
              {data.title || data.name}
              {/* 作品タイトル */}
            </h2>
            <div className='Movie__discriptionWrap--top--flex'>
              <span>{data.release_date}</span>
              {(data.genres || []).map((genre, i) => (
                <Link to={`/${genre.id}`} key={i} id={genre.id}>
                  <span>{genre.name},</span>
                </Link>
              ))}
              <span>{data.episode_run_time + "minits"}</span>
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

        <aside className='m-aside'>
          <dl className='m-aside__top'>
            <dt>原題</dt>
            <dd>{data.original_name}</dd>
            <dt>公開状態</dt>
            <dd>{data.status}</dd>
            <dt>初回放送</dt>
            <dd>{data.first_air_date}</dd>
            <dt>オリジナル言語</dt>
            <dd>{ChangeLanguage(data.original_language)}</dd>
            <dt>予算</dt>
            <dd>${data.budget}</dd>
            <dt>収益</dt>
            <dd>${data.revenue}</dd>
          </dl>

          <div className='m-aside__buttom'>
            <h4>キーワード</h4>
            <div className='m-aside__bottom--flex'>
              {(state.common.keyword || []).map((key, i) => (
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
};

export default IdTv;
