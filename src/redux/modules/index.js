import { combineReducers } from "redux";
import error from "./error";
import loading from "./loading";
import types from "./types";
import filter from "./filter";
import stats from "./stats";
import pokeBuffer from "./pokeBuffer";

export default combineReducers({
  error,
  loading,
  types,
  filter,
  stats,
  pokeBuffer,
});
