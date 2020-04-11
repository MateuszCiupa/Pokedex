import { combineReducers } from "redux";
import pokemon from "./pokemon";
import error from "./error";
import loading from "./loading";
import types from "./types";
import filter from "./filter";
import stats from "./stats";

export default combineReducers({
  pokemon,
  error,
  loading,
  types,
  filter,
  stats,
});
