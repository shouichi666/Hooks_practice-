import React, { useEffect, useReducer } from "react";
import { Header, Footer } from "./components";
import { HashRouter } from "react-router-dom";
import Router from "./router";
import AppContext from "../hooks/contexts/AppContext";
import reducer from "../hooks/reducer";
import initialState from "../hooks/initalState";
import theMovieDb from "themoviedb-javascript-library";

const AppTop = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    //今日人気の映画の取得
    fetch(
      "https://api.themoviedb.org/3/trending/movie/day?api_key=69317ba737cb0ea86a59398a6bbc2973&language=ja"
    )
      .then((res) => res.json())
      .then((json) => dispatch({ type: "GET_DAY_MOVIES", dayData: [json.results] }))
      .catch((error) => error);

    //今週人気の映画の取得
    fetch(
      "https://api.themoviedb.org/3/trending/movie/week?api_key=69317ba737cb0ea86a59398a6bbc2973&language=ja"
    )
      .then((res) => res.json())
      .then((json) => dispatch({ type: "GET_WEEK_MOVIES", weekData: [json.results] }))
      .catch((error) => error);

    //評価の高い映画の取得
    theMovieDb.movies.getTopRated(
      {},
      (movie) => {
        dispatch({ type: "GET_TOP_ROTED_MOVIE", data: JSON.parse(movie) });
      },
      (error) => console.log(error)
    );

    //評価の高いドラマの取得
    theMovieDb.tv.getTopRated(
      {},
      (result) => {
        const topRotedMovie = JSON.parse(result);
        dispatch({ type: "GET_TOP_ROTED_TV", data: topRotedMovie.results });
      },
      (error) => {
        console.log(error);
      }
    );

    //人気の映画の取得
    theMovieDb.movies.getPopular(
      {},
      (result) => {
        const popularMovie = JSON.parse(result);
        dispatch({ type: "GET_POPULAR_MOVIE", data: popularMovie.results });
      },
      (error) => {
        console.log(error);
      }
    );

    //人気のドラマの取得
    theMovieDb.tv.getPopular(
      {},
      (result) => {
        const popularTv = JSON.parse(result);
        dispatch({ type: "GET_POPULAR_TV", data: popularTv.results });
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <HashRouter>
        <Header />
        <Router />
        <Footer />
      </HashRouter>
    </AppContext.Provider>
  );
};

export default AppTop;
