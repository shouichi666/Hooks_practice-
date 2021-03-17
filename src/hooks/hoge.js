import theMovieDb from "themoviedb-javascript-library";
import { XsliderBox, CastSliderBox } from "../template/components/slider";

//backdrop_path
export const BACKDROP_1280 = theMovieDb.common.images_uri + "w1280/";
export const BACKDROP_780 = theMovieDb.common.images_uri + "w780/";
export const BACKDROP_300 = theMovieDb.common.images_uri + "w300/";

//poster_path
export const POSTER_780 = theMovieDb.common.images_uri + "w780/";
export const POSTER_342 = theMovieDb.common.images_uri + "w342/";
export const POSTER_185 = theMovieDb.common.images_uri + "w185/";

//google
export const GOOGLE_JUMP = "https://www.google.com/search?q=";

//timestamp
export const TIMESTAMP = new Date().getTime();

//言語変換
export const changeLanguage = (lang) => {
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
export const _mapXsliderBox = (tartgetState) => {
  return tartgetState.map((data, i) => <XsliderBox key={i} data={data} />);
};

//CastSliderBox map関数
export const _mapCastSliderBox = (tartgetState) => {
  return tartgetState.map((data, i) => <CastSliderBox key={i} cast={data} />);
};

//scrolltop
export const _windowTop = () => {
  window.scrollTo(0, 0);
};

//ジャンル検索
export const _getGenresMovie = (dispatch, id) => {
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

export const _getGenresTv = (dispatch, id) => {
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

export const _addGenresMovie = (dispatch, id, num) => {
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

export const _addGenresTv = (dispatch, id, num) => {
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

//キーワード検索
export const _getKeywordMovie = (dispatch, id, name) => {
  theMovieDb.discover.getMovies(
    { with_keywords: id, include_adult: true, page: 1 },
    (movie) => {
      dispatch({
        type: "GET_KEYWORD_MOVIE",
        keyword: JSON.parse(movie),
        key: name,
        id: id,
      });
    },
    (error) => {
      console.log(error);
    }
  );
};

export const _getKeywordTv = (dispatch, id, name) => {
  theMovieDb.discover.getTvShows(
    { with_keywords: id, include_adult: true, page: 1 },
    (tv) => {
      dispatch({
        type: "GET_KEYWORD_TV",
        keyword: JSON.parse(tv),
        key: name,
        id: id,
      });
    },
    (error) => {
      console.log(error);
    }
  );
};

export const _addKeywordMovie = (dispatch, id, num) => {
  theMovieDb.discover.getMovies(
    { with_keywords: id, include_adult: true, page: num },
    (movie) => {
      dispatch({ type: "ADD_KEYWORD_MOVIE", keyword: JSON.parse(movie) });
    },
    (error) => {
      console.log(error);
    }
  );
};

export const _addKeywordTv = (dispatch, id, num) => {
  theMovieDb.discover.getTvShows(
    { with_keywords: id, include_adult: true, page: num },
    (tv) => {
      dispatch({ type: "ADD_KEYWORD_TV", keyword: JSON.parse(tv) });
    },
    (error) => {
      console.log(error);
    }
  );
};

//ジャンル判別 映画用
export const _checkGenreMovie = (id) => {
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
      return false;
  }
};

//ジャンル判別 TVTV用
export const _checkGenreTv = (id) => {
  switch (id) {
    case 10759:
      return "Action & Adventure";
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
    case 10762:
      return "Kids";
    case 9648:
      return "謎";
    case 10763:
      return "News";
    case 10764:
      return "Reality";
    case 10765:
      return "Sci-Fi & Fantasy";
    case 10766:
      return "Soap";
    case 10767:
      return "Talk";
    case 10768:
      return "War & Politics";
    case 37:
      return "西洋";

    default:
      return false;
  }
};

//Runtime DataBase//
//fbdb favorite に追加
export const _registerDataFavorite = (db, usersId, data, callback) => {
  console.log("favorite");
  db.ref("users/" + usersId + "/favorite/" + (data.title || data.name)).set(
    data,
    (error) => {
      if (!error) {
        alert("お気に入りの作品リストに追加しました。");
        callback();
      } else {
        alert("お気に入りの作品リストに追加出来ませんでした。");
        callback();
      }
    }
  );
};

//fbdb watchLater に追加
export const _registerDataWatchLater = (db, usersId, data, callback) => {
  db.ref("users/" + usersId + "/watchLater/" + (data.title || data.name)).set(
    data,
    (error) => {
      if (!error) {
        alert("後で見たい作品リストに追加しました。");
        callback();
      } else {
        alert("後で見たい作品リストに追加出来ませんでした。");
        callback();
      }
    }
  );
};

//fbdb Pepole に追加
export const _registerDataPepole = (db, usersId, data, callback) => {
  db.ref("users/" + usersId + "/pepole/" + (data.title || data.name)).set(
    data,
    (error) => {
      if (!error) {
        alert("好きな人リストに追加しました。");
        callback();
      } else {
        alert("好きな人リストに追加出来ませんでした。");
        callback();
      }
    }
  ); 
};

//fbdb recent history に追加
export const _registerDataRecent = (db, userId, data) => {
  db.ref("users/" + userId + "/history/" + (data.title || data.name)).set(data);
  db.ref("users/" + userId + "/recent/" + (data.title || data.name)).set(data);
};

//fbdb に同じIDがないか判定
export const _findFromFavoriteId = (db, usersId, thisData, callback) => {
  db.ref("users/" + usersId + "/favorite").on("value", (arg) => {
    arg.forEach((dd) => {
      if (dd.val().id === thisData.id) {
        return callback();
      }
    });
  });
};

//fbdb に同じIDがないか判定
export const _findFromWatchLaterId = (db, usersId, thisData, callback) => {
  db.ref("users/" + usersId + "/watchLater").on("value", (arg) => {
    arg.forEach((dd) => {
      if (dd.val().id === thisData.id) {
        return callback();
      }
    });
  });
};

//fbdb に同じIDがないか判定
export const _findFromPepoleId = (db, usersId, thisData, callback) => {
  db.ref("users/" + usersId + "/pepole").on("value", (data) => {
    data.forEach((dd) => {
      if (dd.val().id === thisData.id) {
        return callback();
      }
    });
  });
};

//fbdb に同じIDのデータを消去する
export const _deleteDbData = (db, usersId, path, thisData, callback) => {
  db.ref("users")
    .child(usersId)
    .child(path)
    .child(thisData.title || thisData.name)
    .remove();
  document.location.reload();
  alert("削除しました。");
  return callback();
};

