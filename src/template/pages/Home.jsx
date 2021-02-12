import React, { useContext, useState } from "react";
import { SlidShow, SearchForm } from "../components/";
import { Xslider, XsliderBox } from "../components/slider";
import { SwitchButton } from "../components/button";
import AppContext from "../../hooks/contexts/AppContext";

const Home = () => {
  const { state } = useContext(AppContext);
  const [trend, setTrend] = useState("今日");
  const [popular, setPopular] = useState("映画");
  const [rated, setRated] = useState("映画");

  const today = state.movie.day.map((data, i) => (
    <XsliderBox key={i} data={data} judge={"movie"} />
  ));
  const week = state.movie.week.map((data, i) => (
    <XsliderBox key={i} data={data} judge={"movie"} />
  ));
  const movie = state.movie.topPopular.map((data, i) => (
    <XsliderBox key={i} data={data} judge={"movie"} />
  ));
  const tv = state.tv.topPopular.map((data, i) => (
    <XsliderBox key={i} data={data} judge={"tv"} />
  ));
  const topMovie = state.movie.topMovies.map((data, i) => (
    <XsliderBox key={i} data={data} judge={"movie"} />
  ));
  const topTv = state.tv.topTv.map((data, i) => (
    <XsliderBox key={i} data={data} judge={"tv"} />
  ));

  const onChangeTrend = (e) => setTrend(e.target.value);
  const onChangeRated = (e) => setRated(e.target.value);
  const onChangePopular = (e) => setPopular(e.target.value);

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
