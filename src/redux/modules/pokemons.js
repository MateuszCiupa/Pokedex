import { getPokemons, pokeUrl } from "util/pokemon";
import { receiveError } from "./error";
import { receiveLoading } from "./loading";

export const REQUEST_POKEMONS = "pokedex/pokemon/REQUEST_POKEMONS";
export const RECEIVE_POKEMON = "pokedex/pokemon/RECEIVE_POKEMON";

const _requestPokemons = (payload) => ({
  type: REQUEST_POKEMONS,
  payload,
});

const _receivePokemon = (payload) => ({
  type: RECEIVE_POKEMON,
  payload,
});

export const requestPokemons = () => async (dispatch, getState) => {
  dispatch(receiveLoading(true));

  try {
    let current = pokeUrl;

    while (!!current) {
      let response = await fetch(current);
      if (!response.ok) throw new Error(response.status);

      let { next, results } = await response.json();
      current = next;

      results.forEach(async ({ url }) => {
        response = await fetch(url);
        if (!response.ok) throw new Error(response.status);
        let data = await response.json();
        dispatch(_receivePokemon(data));
      });
    }

    dispatch(receiveLoading(false));
  } catch (e) {
    console.log(e);
    dispatch(receiveLoading(false));
    dispatch(receiveError("Problem while loading pokemons"));
  }
};

export default (state = [], { type, payload }) => {
  switch (type) {
    case REQUEST_POKEMONS:
      return payload;

    case RECEIVE_POKEMON:
      return [...state, payload];

    default:
      return state;
  }
};
