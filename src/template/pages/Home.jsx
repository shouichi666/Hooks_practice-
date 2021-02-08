import React, { useContext } from "react";
import { SlidShow, SearchForm } from "../components/";
import { Xslider, XsliderBox } from "../components/slider";
import AppContext from "../../hooks/contexts/AppContext";

const Home = () => {
  const { state } = useContext(AppContext);

  return (
    <main className='Home'>
      <section className='Home__firstView'>
        <SearchForm />
        <SlidShow />
      </section>

      <Xslider heading='評価の高い'>
        {state.movie.topMovies.map((data, i) => (
          <XsliderBox key={i} data={data} />
        ))}
      </Xslider>

      <Xslider heading='トレンド'>
        {state.movie.week.map((data, i) => (
          <XsliderBox key={i} data={data} />
        ))}
      </Xslider>

      <Xslider heading='トレンド'>
        {state.movie.day.map((data, i) => {
          return <XsliderBox key={i} data={data} />;
        })}
      </Xslider>
    </main>
  );
};

export default Home;
