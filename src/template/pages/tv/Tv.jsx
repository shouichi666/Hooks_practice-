import React from "react";
import { Route, Switch } from "react-router-dom";
import { IdTv } from "./";
import { ArchiveTv } from "./ArchiveTv";

const Tv = () => {
  return (
    <main>
      <Switch>
        <Route path='/tv/list'>
          <ArchiveTv />
        </Route>
        <Route path='/tv/:id'>
          <IdTv />
        </Route>
      </Switch>
    </main>
  );
};

export default Tv;
