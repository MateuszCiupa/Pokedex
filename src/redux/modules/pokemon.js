import { POKE_LIMIT_DEFAULT, getPokeWithLimits } from "util/pokemon";
import { receiveError } from "./error";
import { setLeftLimit, setRightLimit, setPokeCount } from "./stats";
import { receiveLoading } from "./loading";
import { setFirstId } from "./filter";
import shouldFilter from "util/filter";

const RECEIVE_POKE_RESULTS = "pokedex/pokemon/RECEIVE_POKE_RESULTS";
const RECEIVE_POKE_RESULT = "pokedex/pokemon/RECEIVE_POKE_RESULT";
const RECEIVE_POKE_LIMIT = "pokedex/pokemon/RECEIVE_POKE_LIMIT";
const RECEIVE_POKE_OFFSET = "pokedex/pokemon/RECEIVE_POKE_OFFSET";
const RECEIVE_POKE_RESULT_BACKWARDS =
  "pokedex/pokemon/RECEIVE_POKE_RESULT_BACKWARDS";

const receivePokeResults = (payload) => ({
  type: RECEIVE_POKE_RESULTS,
  payload,
});

const receivePokeResult = (payload) => ({
  type: RECEIVE_POKE_RESULT,
  payload,
});

const receivePokeLimit = (payload) => ({
  type: RECEIVE_POKE_LIMIT,
  payload,
});

const receivePokeOffset = (payload) => ({
  type: RECEIVE_POKE_OFFSET,
  payload,
});

const receivePokeResultBackwards = (payload) => ({
  type: RECEIVE_POKE_RESULT_BACKWARDS,
  payload,
});

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
        results: payload,
      };

    case RECEIVE_POKE_RESULT:
      return {
        ...state,
        results: [...state.results, payload],
      };

    case RECEIVE_POKE_LIMIT:
      return {
        ...state,
        limit: payload,
      };

    case RECEIVE_POKE_OFFSET:
      return {
        ...state,
        offset: payload,
      };

    case RECEIVE_POKE_RESULT_BACKWARDS:
      return {
        ...state,
        results: [payload, ...state.results],
      };

    default:
      return state;
  }
};

export const getPokeMax = () => async (dispatch, getState) => {
  dispatch(receiveLoading(true));

  const { filter, stats, pokemon } = getState();
  if (!stats.pokeCount) dispatch(setPokeCount());
  const { pokeCount = 964, pageLimit } = stats;
  let { firstId } = filter;

  let offset = pokemon.offset + pokemon.limit;

  // TODO: store in buffor to load faster, currently it's dumping results
  dispatch(receivePokeResults([]));
  dispatch(receivePokeOffset(offset));

  let limit = 0;
  let received = 0;

  try {
    while (received < pageLimit && offset + limit < pokeCount) {
      let response = await getPokeWithLimits(
        offset + limit,
        POKE_LIMIT_DEFAULT
      );

      if (!response.ok) throw new Error(response.status);

      const { results } = await response.json();

      for (let i = 0; i < results.length; i++) {
        response = await fetch(results[i].url);
        if (!response.ok) throw new Error(response.status);

        // ikr, no other way tho
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

        limit++;

        if (!filter.active || !shouldFilter(pokemon, filter)) {
          dispatch(receivePokeResult(pokemon));
          received++;
          if (!firstId) {
            firstId = id;
            dispatch(setFirstId(id));
          }
          if (received === pageLimit) break;
        }
      }
    }
  } catch (e) {
    console.log(e);
    dispatch(receiveError("Problem while getting next pokes"));
  }

  dispatch(setLeftLimit(!(offset > 0)));
  dispatch(setRightLimit(!(offset + limit < pokeCount)));
  dispatch(receivePokeLimit(limit));
  dispatch(receiveLoading(false));
};

export const getPokePrevious = () => async (dispatch, getState) => {
  dispatch(receiveLoading(true));

  const { filter, stats, pokemon } = getState();
  const { pokeCount = 964, pageLimit } = stats;
  const { firstId } = filter;

  let offset = pokemon.offset;

  if (offset === 0) return dispatch(receiveLoading(false));

  dispatch(receivePokeResults([]));

  let limit = 0;
  let received = 0;

  try {
    while (received < pageLimit && offset - limit > 0) {
      let response = await getPokeWithLimits(
        offset - limit - POKE_LIMIT_DEFAULT < 0
          ? 0
          : offset - limit - POKE_LIMIT_DEFAULT,
        offset - limit - POKE_LIMIT_DEFAULT < 0
          ? offset - limit
          : POKE_LIMIT_DEFAULT
      );

      if (!response.ok) throw new Error(response.status);

      const { results } = await response.json();

      for (let i = results.length - 1; i >= 0; i--) {
        response = await fetch(results[i].url);
        if (!response.ok) throw new Error(response.status);

        // ikr, no other way tho
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

        limit++;

        if (!filter.active || !shouldFilter(pokemon, filter)) {
          dispatch(receivePokeResultBackwards(pokemon));
          received++;
          if (received === pageLimit) break;
        }
      }
    }
  } catch (e) {
    console.log(e);
    dispatch(receiveError("Problem while getting previous pokes"));
  }

  offset -= limit;
  console.log(firstId);
  dispatch(receivePokeOffset(offset));
  dispatch(setLeftLimit(!(offset > 0) || offset + 1 === firstId));
  dispatch(setRightLimit(!(offset + limit < pokeCount)));
  dispatch(receivePokeLimit(limit));
  dispatch(receiveLoading(false));
};
