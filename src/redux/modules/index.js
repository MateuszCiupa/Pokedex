import { combineReducers } from "redux";
import pokemons from "./pokemons";
import error from "./error";
import loading from "./loading";
import types from "./types";

export default combineReducers({ pokemons, error, loading, types });
