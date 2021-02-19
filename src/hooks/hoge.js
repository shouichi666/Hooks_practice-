import theMovieDb from "themoviedb-javascript-library";
import { XsliderBox, CastSliderBox } from "../template/components/slider";

//backdrop_path
export const BACKDROP_780 = theMovieDb.common.images_uri + "w780/";

//poster_path
export const POSTER_780 = theMovieDb.common.images_uri + "w780/";
export const POSTER_342 = theMovieDb.common.images_uri + "w342/";
export const POSTER_185 = theMovieDb.common.images_uri + "w185/";

//言語変換
export const ChangeLanguage = (lang) => {
  if (lang === "en") {
    return "ENGLISH";
  } else if (lang === "ja") {
    return "日本語";
  } else if (lang === "ko") {
    return "韓国語";
  } else if (lang === "fr") {
    return "フランス語";
  } else if (lang === "es") {
    return "スペイン語";
  } else if (lang === "pt") {
    return "ポルトガル語";
  } else if (lang === "hu") {
    return "ハンガリー語";
  } else {
    return lang;
  }
};

//XsliderBox map関数
export const _MapXsliderBox = (tartgetState) => {
  return tartgetState.map((data, i) => <XsliderBox key={i} data={data} />);
};

//CastSliderBox map関数
export const _MapCastSliderBox = (tartgetState) => {
  return tartgetState.map((data, i) => <CastSliderBox key={i} cast={data} />);
};

//scrolltop
export const _WindowTop = () => {
  window.scrollTo(0, 0);
};

//ジャンル検索
export const _GetGenresMovie = (dispatch, id) => {
  theMovieDb.discover.getMovies(
    { with_genres: id, include_adult: true, page: 1 },
    (movie) => {
      dispatch({ type: "GET_GENRES_MOVIE", genres: JSON.parse(movie), id: id });
    },
    (error) => {
      console.log(error);
    }
  );
};

export const _GetGenresTv = (dispatch, id) => {
  theMovieDb.discover.getTvShows(
    { with_genres: id, include_adult: true, page: 1 },
    (tv) => {
      dispatch({ type: "GET_GENRES_TV", genres: JSON.parse(tv), id: id });
    },
    (error) => {
      console.log(error);
    }
  );
};

export const _AddGenresMovie = (dispatch, id, num) => {
  theMovieDb.discover.getMovies(
    { with_genres: id, include_adult: true, page: num },
    (movie) => {
      dispatch({ type: "ADD_GENRES_MOVIE", genres: JSON.parse(movie) });
    },
    (error) => {
      console.log(error);
    }
  );
};

export const _AddGenresTv = (dispatch, id, num) => {
  theMovieDb.discover.getTvShows(
    { with_genres: id, include_adult: true, page: num },
    (tv) => {
      dispatch({ type: "ADD_GENRES_TV", genres: JSON.parse(tv) });
    },
    (error) => {
      console.log(error);
    }
  );
};

//ジャンル判別
export const _CheckGenre = (id) => {
  switch (id) {
    case 28:
      return "アクション";
    case 12:
      return "アドベンチャー";
    case 16:
      return "アニメーション";
    case 35:
      return "コメディ";
    case 80:
      return "犯罪";
    case 99:
      return "ドキュメンタリー";
    case 18:
      return "ドラマ";
    case 10751:
      return "ファミリー";
    case 14:
      return "ファンタジー";
    case 36:
      return "履歴";
    case 27:
      return "ホラー";
    case 10402:
      return "音楽";
    case 9648:
      return "謎";
    case 10749:
      return "ロマンス";
    case 878:
      return "サイエンスフィクション";
    case 10770:
      return "テレビ映画";
    case 53:
      return "スリラー";
    case 10752:
      return "戦争";
    case 37:
      return "西洋";

    default:
      return;
  }
};
