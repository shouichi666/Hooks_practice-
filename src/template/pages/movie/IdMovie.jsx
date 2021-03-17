import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PieChart, Player, MovieDialogList } from "../../components";
import { CastSliderBox, Xslider } from "../../components/slider";
import AppContext from "../../../hooks/contexts/AppContext";
import theMovieDb from "themoviedb-javascript-library";
import PlayCircleOutlineTwoToneIcon from "@material-ui/icons/PlayCircleOutlineTwoTone";
import PlaylistAddTwoToneIcon from "@material-ui/icons/PlaylistAddTwoTone";
import {
  POSTER_342,
  BACKDROP_1280,
  GOOGLE_JUMP,
  changeLanguage,
  _mapXsliderBox,
  _windowTop,
  _getGenresMovie,
  _getKeywordMovie,
  _registerDataFavorite,
  _registerDataWatchLater,
  _findFromFavoriteId,
  _findFromWatchLaterId,
} from "../../../hooks/hoge";
import { db } from "../../../firebase";

const Movie_Id = () => {
  const { state, dispatch } = useContext(AppContext);
  const [movies, setMovie] = useState([]);
  const [casts, setCasts] = useState(null);
  const [video, setVideo] = useState([]);
  const [open, setOpen] = useState(true);
  const [dialog, setDialog] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const [watch, setWatch] = useState(false);
  const data = state.movie.viewItem;
  const lang = data.original_language;
  const keywords = state.common.keyword;
  let backgroundSize = window.innerWidth > 400 ? "cover" : "contain";
  let backgroundPosition =
    window.innerWidth > 400 ? "right -200px top" : " left 0px bottom 0px";

  const style = {
    backgroundImage: `url(${BACKDROP_1280 + data.backdrop_path})`,
    backgroundSize: backgroundSize,
    backgroundRepeat: "no-repeat",
    backgroundPosition: backgroundPosition,
  };

  useEffect(() => {
    _findFromFavoriteId(db, state.users.id, data, () => setFavorite(true));
    _findFromWatchLaterId(db, state.users.id, data, () => setWatch(true));

    return () => () => {
      return;
    };
  }, [data, state.users.id]);

  useEffect(() => {
    theMovieDb.movies.getVideos(
      { id: data.id },
      (movie) => {
        const mm = JSON.parse(movie);
        setVideo(mm.results);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => () => {
      return;
    };
  }, [data.id]);

  const getMovie = () => {
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
  };

  const onClickSetYoutubeKey = (e) => {
    const value = e.target.id;
    dispatch({ type: "SET_YOUTUBE_KEY", key: value });
    setOpen(false);
  };

  const closePlayer = () => {
    dispatch({ type: "DELETE_YOUTUBE_KEY" });
    setOpen(true);
  };

  const toggleDialog = () => setDialog(false);
  const closeDialog = () => setDialog(true);

  useEffect(getMovie, [state]);
  useEffect(_windowTop, [state]);

  return (
    <main id='movie' className='Movie'>
      <Player open={open} onClick={closePlayer} />

      <section className='Movie__firstView' style={style}>
        <div className='Movie__posterWrap'>
          <img
            src={POSTER_342 + data.poster_path}
            alt={data.poster_path}
            loading='lazy'
          />
        </div>

        <div className='Movie__discriptionWrap'>
          <div className='Movie__discriptionWrap--top'>
            <h2 className='Movie__discriptionWrap--top--title'>
              <a href={`${GOOGLE_JUMP}${data.title}`} target='_brank'>
                {data.title}
              </a>
              {/* 作品タイトル */}
            </h2>
            <h3 className='Movie__discriptionWrap--top--tanline'>
              {data.tagline}
            </h3>
            <div className='Movie__discriptionWrap--top--flex'>
              <span>{data.release_date}</span>
              <span>Run time : {data.runtime + "minits"}</span>
            </div>
          </div>

          <div className='Movie__discriptionWrap--mid'>
            <div className='Movie__discriptionWrap--mid--top'>
              <div className='Movie__discriptionWrap--mid--top--score score'>
                <PieChart
                  width={window.innerWidth > 400 ? 70 : 45}
                  height={window.innerWidth > 400 ? 70 : 45}
                  inner={window.innerWidth > 400 ? 30 : 20}
                  outer={window.innerWidth > 400 ? 33 : 22}
                  review={data.vote_average}
                />
                <div className='scoreCircle'>
                  {data.vote_average * 10}
                  <span className='scoreCircle__amount'>%</span>
                </div>
              </div>
              <PlaylistAddTwoToneIcon
                className='Movie__icon'
                onClick={toggleDialog}
              />
              <MovieDialogList
                data={state.movie.viewItem}
                open={dialog}
                onClose={closeDialog}
                top='200px'
                left='30px'
                registerDataFavorite={() =>
                  _registerDataFavorite(db, state.users.id, data, closeDialog)
                }
                registerDataWatchLater={() =>
                  _registerDataWatchLater(db, state.users.id, data, closeDialog)
                }
                favorite={favorite}
                watch={watch}
              />
            </div>

            <div className='Movie__discriptionWrap--mid--bottom'>
              {(data.genres || []).map((genre, i) => (
                <Link
                  to={`/words/movie/${genre.name}`}
                  key={i}
                  id={genre.id}
                  onClick={() => _getGenresMovie(dispatch, genre.id)}
                  className='Movie__discriptionWrap--mid--bottom-gunre'
                >
                  <span>#{genre.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className='Movie__discriptionWrap--bottom'>
            <h3 className='Movie__discriptionWrap--bottom'>概要</h3>
            <p>{data.overview}</p>
            <div className='Movie__discriptionWrap--teaserWrap'>
              {video.map((v, i) => {
                return (
                  <div
                    key={i}
                    className='Movie__discriptionWrap--teaserWrap--imgBox'
                  >
                    <PlayCircleOutlineTwoToneIcon className='Movie__discriptionWrap--teaserWrap--imgBox-icon' />
                    <img
                      src={`https://img.youtube.com/vi/${v.key}/mqdefault.jpg`}
                      alt=''
                      onClick={onClickSetYoutubeKey}
                      id={v.key}
                      className='Movie__discriptionWrap--teaserWrap--imgBox-img'
                    />
                    <h4 className='Movie__discriptionWrap--teaserWrap--imgBox-name'>
                      {v.name}
                    </h4>
                  </div>
                );
              })}
            </div>
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
          <Xslider heading={`オススメ ${movies.length} 作品`}>
            {_mapXsliderBox(movies, state.common.searchType)}
          </Xslider>
        </div>

        <aside className='m-aside'>
          <dl className='m-aside__top'>
            <dt>原題</dt>
            <dd>{data.original_title}</dd>
            <dt>公開状態</dt>
            <dd>{data.status}</dd>
            <dt>オリジナル言語</dt>
            <dd>{changeLanguage(lang)}</dd>
            <dt>予算</dt>
            <dd>${data.budget}</dd>
            <dt>収益</dt>
            <dd>${data.revenue}</dd>
          </dl>

          <div className='m-aside__buttom'>
            <h4>キーワード</h4>
            <div className='m-aside__bottom--flex'>
              {(keywords || []).map((key, i) => (
                <Link key={i} to={`/words/k/movie/${key.name}`}>
                  <button
                    value={key.id}
                    onClick={() => _getKeywordMovie(dispatch, key.id, key.name)}
                  >
                    {key.name}
                  </button>
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

export default Movie_Id;
