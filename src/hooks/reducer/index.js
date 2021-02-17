import { combineReducers } from "redux";
import users from "./users";
import search from "./search";
import common from "./common";
import movie from "./movie";
import tv from "./tv";
import cast from "./cast";

export default combineReducers({
  cast,
  common,
  users,
  search,
  movie,
  tv,
});
