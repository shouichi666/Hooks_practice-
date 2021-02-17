import { Switch, Route } from "react-router-dom";
import { Search, Favorite, Home, Sign } from "./pages";
import { Tv } from "./pages/tv";
import { Movie } from "./pages/movie/";
import { Cast } from "./pages/cast";

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
        <Tv />
      </Route>

      <Route path='/movie/'>
        <Movie />
      </Route>

      <Route path='/cast/'>
        <Cast />
      </Route>

      <Route path='/favorite'>
        <Favorite />
      </Route>

      <Route path='/sign'>
        <Sign />
      </Route>
    </Switch>
  );
};

export default Router;
