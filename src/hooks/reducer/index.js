import { combineReducers } from "redux";
import users from "./users";
import search from "./search";
import common from "./common";
import movie from "./movie";
import tv from "./tv";

export default combineReducers({
  users,
  search,
  common,
  movie,
  tv,
});
