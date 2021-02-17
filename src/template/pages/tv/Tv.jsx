import React from "react";
import { Route, Switch } from "react-router-dom";
import { ArchiveTv, IdTv } from "./";
// import { PieChart } from "../../components";
// import { CastSliderBox, Xslider, XsliderBox } from "../../components/slider";
// import AppContext from "../../../hooks/contexts/AppContext";
// import theMovieDb from "themoviedb-javascript-library";
// import { POSTER_342, BACKDROP_780 } from "../../../hooks/hoge";

const Tv = () => {
  return (
    <Switch>
      <Route path='/tv/list'>
        <ArchiveTv />
      </Route>
      <Route path='/tv/:id'>
        <IdTv />
      </Route>
    </Switch>
  );
};

export default Tv;
