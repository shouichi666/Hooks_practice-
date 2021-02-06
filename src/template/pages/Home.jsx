import React, { useContext } from "react";
import { SlidShow, Xslider, SearchForm } from "../components/";
import AppContext from "../../hooks/contexts/AppContext";

const Home = () => {
  const { state } = useContext(AppContext);

  return (
    <main className="Home">
      <section className="Home__firstView">
        <SearchForm />
        <SlidShow />
      </section>

      <Xslider heading="評価の高い" datas={state.movie.topMovies} />
      <Xslider heading="トレンド 今週" datas={state.movie.week} />
      <Xslider heading="トレンド 今日" datas={state.movie.day} />
    </main>
  );
};

export default Home;
