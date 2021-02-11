import React, { useContext } from "react";
import AppContext from "../../hooks/contexts/AppContext";
import theMovieDb from "themoviedb-javascript-library";
import { POSTER_185 } from "../../hooks/hoge";

const Search = () => {
  const { state } = useContext(AppContext);
  return (
    <main id='Search' className='Search'>
      <h1>search result</h1>
      <p>total result : {state.common.searchItems.totalResult}</p>
      <p>total page : {state.common.searchItems.totalPage}</p>
      <div className='archiveContainer'>
        <ul>
          {state.common.searchItems.results.map((result, i) => {
            return (
              <li key={i}>
                <img src={POSTER_185 + result.poster_path} alt='' />
                {result.name || result.title}
                {result.overview}
                {result.vote_average}
              </li>
            );
          })}
        </ul>
        <aside>
          <h3>検索結果</h3>
          <ul></ul>
        </aside>
      </div>
    </main>
  );
};

export default Search;
