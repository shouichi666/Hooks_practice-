import React, { useEffect, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { ArchiveCast, IdCast } from ".";
import AppContext from "../../../hooks/contexts/AppContext";
import theMovieDb from "themoviedb-javascript-library";

const Cast = () => {
  const { dispatch } = useContext(AppContext);

  const getPeple = () => {
    theMovieDb.people.getPopular(
      { page: 1 },
      (people) => {
        dispatch({ type: "GET_PEOPLE", people: JSON.parse(people) });
        console.log("W");
      },
      (error) => {
        console.error(error);
      }
    );
  };

  useEffect(getPeple, [dispatch]);

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
