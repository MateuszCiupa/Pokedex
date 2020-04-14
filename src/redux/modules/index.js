import { combineReducers } from "redux";
import error from "./error";
import types from "./types";
import filter from "./filter";
import stats from "./stats";
import pokeBuffer from "./pokeBuffer";

export default combineReducers({
  error,
  types,
  filter,
  stats,
  pokeBuffer,
});
