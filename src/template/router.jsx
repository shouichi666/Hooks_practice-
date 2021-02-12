import { Switch, Route } from "react-router-dom";
import { Search, Favorite, Home, Sign } from "./pages";
import { ArchiveTv, Tv } from "./pages/tv";
import { ArchiveMovie, Movie } from "./pages/movie/";
import { ArchiveCast, Cast } from "./pages/cast";

const Router = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>

      <Route path='/search/'>
        <Search />
      </Route>

      <Route path='/tv/'>
        {/* TV page */}
        <ArchiveTv />
      </Route>

      <Route path='/tv/:id'>
        <Tv />
      </Route>

      <Route path='/movie/'>
        {/* 映画 page */}
        <ArchiveMovie />
      </Route>

      <Route path='/movie/:id'>
        <Movie />
      </Route>

      <Route path='/cast/'>
        {/* CAST page */}
        <ArchiveCast />
      </Route>

      <Route path='/cast/:id'>
        <Cast />
      </Route>

      <Route exact path='/favorite'>
        <Favorite />
      </Route>

      <Route exact path='/sign'>
        <Sign />
      </Route>
    </Switch>
  );
};

export default Router;
