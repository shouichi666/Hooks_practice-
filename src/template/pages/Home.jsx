import React, { useContext } from "react";
import { SlidShow, SearchForm } from "../components/";
import { Xslider, XsliderBox } from "../components/slider";
import AppContext from "../../hooks/contexts/AppContext";
import ToggleSlider from "../components/slider/ToggleSlider";

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

      <ToggleSlider heading='TRENDO' />
    </main>
  );
};

export default Home;
