import React from "react";
import { Route, Switch } from "react-router-dom";
import { ArchiveMovie, IdMovie } from ".";

const Movie = () => {
  return (
    <main>
      <Switch>
        <Route path='/movie/list'>
          <ArchiveMovie />
        </Route>
        <Route path='/movie/:id'>
          <IdMovie />
        </Route>
      </Switch>
    </main>
  );
};

export default Movie;
