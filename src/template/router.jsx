import { Switch, Route } from "react-router-dom";
import { Archive, Favorite, Home, Sign } from "./pages";
import Movie from "./pages/Movie";

const Router = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>

      <Route path='/archive/'>
        <Archive />
      </Route>

      <Route path='/movie/:id'>
        <Movie />
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
