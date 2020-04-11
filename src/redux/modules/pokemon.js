import shouldFilter from "util/filter";
import { getPokeWithLimits, POKE_DISPLAY_LIMIT } from "util/pokemon";
import { receiveError } from "./error";
import { setPokeCount } from "./stats";

const RECEIVE_POKE_RESULT = "pokedex/pokemon/RECEIVE_POKE_RESULT";

export const receivePokeResult = (payload) => ({
  type: RECEIVE_POKE_RESULT,
  payload,
});

const getPokeMax = () => async (dispatch) => {};

export const getPokeFirst = () => async (dispatch, { filter, stats }) => {
  try {
    let response = await getPokeWithLimits(
      0,
      stats ? stats.pageLimit : POKE_DISPLAY_LIMIT
    );
    if (!response.ok) throw new Error(response.status);
    const { count, results } = await response.json();

    let limit = 0;
    results.forEach(async ({ url }) => {
      try {
        response = await fetch(url);
        if (!response.ok) throw new Error(response.status);
        const {
          name,
          height,
          weight,
          types,
          sprites,
          base_experience,
          abilities,
        } = await response.json();
        const pokemon = {
          name,
          height,
          weight,
          types,
          sprites,
          base_experience,
          abilities,
        };
        if (!filter || !shouldFilter(pokemon, filter)) {
          dispatch(receivePokeResult(pokemon));
          limit++;
        }
      } catch (e) {
        console.log(e);
        dispatch(receiveError("Problem while getting poke details"));
      }
    });

    dispatch(setPokeCount(count));
  } catch (e) {
    console.log(e);
    dispatch(receiveError("Problem while getting poke first"));
  }
};

const initialState = {
  offset: 0,
  limit: 0,
  results: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case RECEIVE_POKE_RESULT:
      return {
        ...state,
        results: [...state.results, payload],
        limit: state.limit + 1,
      };

    default:
      return state;
  }
};
