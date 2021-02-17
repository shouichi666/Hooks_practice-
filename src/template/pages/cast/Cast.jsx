import React, { useEffect, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { ArchiveCast, IdCast } from ".";
import AppContext from "../../../hooks/contexts/AppContext";
import theMovieDb from "themoviedb-javascript-library";

const Cast = () => {
  const { state, dispatch } = useContext(AppContext);

  const getPeple = () => {
    theMovieDb.people.getPopular(
      { page: 1 },
      (people) => {
        dispatch({ type: "GET_PEOPLE", people: JSON.parse(people), page: 1 });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  useEffect(getPeple, []);

  return (
    <>
      <Switch>
        <Route path='/cast/list'>
          <ArchiveCast />
        </Route>
        <Route path='/cast/:id'>
          <IdCast />
        </Route>
      </Switch>
    </>
  );
};

export default Cast;
