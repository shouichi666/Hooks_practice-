import theMovieDb from "themoviedb-javascript-library";

//backdrop_path
export const BACKDROP_780 = theMovieDb.common.images_uri + "w780/";

//poster_path
export const POSTER_780 = theMovieDb.common.images_uri + "w780/";
export const POSTER_342 = theMovieDb.common.images_uri + "w342/";
export const POSTER_185 = theMovieDb.common.images_uri + "w185/";



//
//
//
//
//
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
}