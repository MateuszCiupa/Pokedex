import { getPokeMax } from "util/pokemon";
import { receiveError } from "./error";
import { setPokeCount } from "./stats";
import { receiveLoading } from "./loading";

const RECEIVE_POKE_RESULTS = "pokedex/pokemon/RECEIVE_POKE_RESULTS";

export const receivePokeResults = (payload) => ({
  type: RECEIVE_POKE_RESULTS,
  payload,
});

export const getPokeFirst = () => async (dispatch, getState) => {
  dispatch(receiveLoading(true));
  dispatch(setPokeCount());

  const { stats, filter } = getState();
  const { pageLimit } = stats;

  let payload = await getPokeMax({
    offset: 0,
    filter,
    pageLimit,
  });

  dispatch(receiveLoading(false));

  if (!payload) return dispatch(receiveError("Problem with poke first"));

  dispatch(receivePokeResults(payload));
};

export const getPokeNext = () => async (dispatch, getState) => {
  dispatch(receiveLoading(true));

  const { stats, filter, pokemon } = getState();
  const { pageLimit, pokeCount } = stats;
  const offset = pokemon.offset + pokemon.limit;

  let payload = await getPokeMax({
    offset,
    filter,
    pageLimit,
    pokeCount,
  });

  dispatch(receiveLoading(false));

  if (!payload) return dispatch(receiveError("Problem with poke next"));

  dispatch(receivePokeResults({ ...payload, offset }));
};

const initialState = {
  offset: 0,
  limit: 0,
  results: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case RECEIVE_POKE_RESULTS:
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
};
