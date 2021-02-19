import React, { useCallback, useContext, useState } from "react";
import { SlidShow, SearchForm } from "../components/";
import { Xslider } from "../components/slider";
import { SwitchButton } from "../components/button";
import AppContext from "../../hooks/contexts/AppContext";
import { _MapXsliderBox } from "../../hooks/hoge";

const Home = () => {
  const { state } = useContext(AppContext);
  const [trend, setTrend] = useState("今日");
  const [popular, setPopular] = useState("映画");
  const [rated, setRated] = useState("映画");

  const today = _MapXsliderBox(state.movie.day, "movie");
  const week = _MapXsliderBox(state.movie.week, "movie");
  const movie = _MapXsliderBox(state.movie.popular.results, "movie");
  const topMovie = _MapXsliderBox(state.movie.rated.results, "movie");
  const tv = _MapXsliderBox(state.tv.popular.results, "tv");
  const topTv = _MapXsliderBox(state.tv.rated.results, "tv");

  const onChangeTrend = useCallback((e) => setTrend(e.target.value), []);
  const onChangeRated = useCallback((e) => setRated(e.target.value), []);
  const onChangePopular = useCallback((e) => setPopular(e.target.value), []);

  const data = {
    trend: [
      {
        id: "trend1",
        label: "今日",
        value: "今日",
      },
      {
        id: "trend2",
        label: "今週",
        value: "今週",
      },
    ],

    popular: [
      {
        id: "popular1",
        label: "映画",
        value: "映画",
      },
      {
        id: "popular2",
        label: "ドラマ",
        value: "ドラマ",
      },
    ],

    rated: [
      {
        id: 1,
        label: "映画",
        value: "映画",
      },
      {
        id: 2,
        label: "TV",
        value: "TV",
      },
    ],
  };

  return (
    <main className='Home'>
      <section className='Home__firstView'>
        <SearchForm />
        <SlidShow />
      </section>

      <Xslider
        heading='人気の作品'
        tab={
          <SwitchButton onChange={onChangePopular} state={popular} datas={data.popular} />
        }
      >
        {popular === "映画" ? movie : popular === "ドラマ" ? tv : ""}
      </Xslider>

      <Xslider
        heading='評価の高い作品'
        tab={<SwitchButton onChange={onChangeRated} state={rated} datas={data.rated} />}
      >
        {rated === "映画" ? topMovie : rated === "TV" ? topTv : ""}
      </Xslider>

      <Xslider
        heading='TREND MOVIE'
        tab={<SwitchButton onChange={onChangeTrend} state={trend} datas={data.trend} />}
      >
        {trend === "今日" ? today : trend === "今週" ? week : ""}
      </Xslider>
    </main>
  );
};

export default Home;
