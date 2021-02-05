import React, { useContext, useState } from "react";
import thumbnail from "../../asset/imags/thumbnail.jpg";
import Xslider from "../components/Xslider";
import AppContext from "../../hooks/contexts/AppContext";

const Home = () => {
  const { state } = useContext(AppContext);

  const [text, setText] = useState("");
  const handleChange = (e) => setText(e.target.value);
  return (
    <main className="Home">
      <section className="Home__firstView">
        <form action="/search" method="get" className="Home__firstView--form">
          <input
            className="Home__firstView--input"
            type="text"
            id="firstViewInput"
            value={text}
            name="firstViewInput"
            onChange={handleChange}
            placeholder="movie or acter ..."
          />
          <input
            className="Home__firstView--submit"
            type="submit"
            value="Search"
          />
        </form>
        <img
          className="Home__firstView--thumbnail"
          alt={thumbnail}
          src={thumbnail}
        />
      </section>

      <Xslider heading="評価の高い" datas={state.movie.topMovies} />
      <Xslider heading="トレンド 今週" datas={state.movie.week} />
      <Xslider heading="トレンド 今日" datas={state.movie.day} />
    </main>
  );
};

export default Home;
