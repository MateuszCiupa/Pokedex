import {
  pokeCountUrl,
  getPokeWithLimits,
  POKE_DISPLAY_LIMIT,
} from "util/pokemon";
import { receiveError } from "./error";
import { setPokeCount } from "./stats";

export const RECEIVE_BUFFER_RESULT = "pokedex/pokeBuffer/RECEIVE_BUFFER_RESULT";
const SET_BUFFER = "pokedex/pokeBuffer/SET_BUFFER";

const setBuffer = (payload) => ({
  type: SET_BUFFER,
  payload,
});

const receiveBufferResult = (payload, index) => ({
  type: RECEIVE_BUFFER_RESULT,
  payload,
  index,
});

const loadNormal = (offset, limit) => async (dispatch) => {
  try {
    let response = await getPokeWithLimits(offset, limit);
    if (!response.ok) throw new Error(response.status);
    const { results } = await response.json();

    for (let i = 0; i < results.length; i++) {
      response = await fetch(results[i].url);
      if (!response.ok) throw new Error(response.status);

      const {
        name,
        weight,
        height,
        abilities,
        base_experience,
        sprites,
        types,
        id,
      } = await response.json();

      const pokemon = {
        name,
        weight,
        height,
        abilities,
        base_experience,
        sprites,
        types,
        id,
      };

      dispatch(receiveBufferResult(pokemon, i));
    }
  } catch (e) {
    console.log(e);
    dispatch(receiveError("Problem while loading normal"));
  }
};

export const startLoading = () => async (dispatch) => {
  try {
    let response = await fetch(pokeCountUrl);
    if (!response.ok) throw new Error(response.status);
    const { count } = await response.json();

    dispatch(setPokeCount(count));
    dispatch(setBuffer(Math.ceil(count / POKE_DISPLAY_LIMIT)));

    dispatch(loadNormal(0, count));
  } catch (e) {
    console.log(e);
    dispatch(receiveError("Problem while buffering"));
  }
};

export default (state = [], { type, payload, index }) => {
  switch (type) {
    case SET_BUFFER:
      return new Array(payload).fill([]);

    case RECEIVE_BUFFER_RESULT:
      const page = Math.floor(index / POKE_DISPLAY_LIMIT);
      return [
        ...state.slice(0, page),
        [...state[page], payload],
        ...state.slice(page + 1, state.length),
      ];

    default:
      return state;
  }
};
