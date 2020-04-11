import { POKE_DISPLAY_LIMIT, pokeCountUrl } from "util/pokemon";
import { receiveError } from "./error";

const SET_POKE_COUNT = "pokedex/stats/SET_POKE_COUNT";
const SET_PAGE_LIMIT = "pokedex/stats/SET_PAGE_LIMIT";
const INCR_PAGE = "pokedex/stats/INCR_PAGE";
const DECR_PAGE = "pokedex/stats/DECR_PAGE";

const initialState = {
  pokeCount: null,
  currentPage: 0,
  pageLimit: POKE_DISPLAY_LIMIT,
};

const _setPokeCount = (payload) => ({
  type: SET_POKE_COUNT,
  payload,
});

export const setPageLimit = (payload) => ({
  type: SET_PAGE_LIMIT,
  payload,
});

export const incrPage = () => ({
  type: INCR_PAGE,
});

export const decrPage = () => ({
  type: DECR_PAGE,
});

export const setPokeCount = () => async (dispatch) => {
  try {
    const response = await fetch(pokeCountUrl);
    if (!response.ok) throw new Error(response.status);
    const { count } = await response.json();
    dispatch(_setPokeCount(count));
  } catch (e) {
    console.log(e);
    dispatch(receiveError("Problem while getting poke count"));
  }
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_POKE_COUNT:
      return {
        pokeCount: payload,
        ...state,
      };

    case SET_PAGE_LIMIT:
      return {
        pageLimit: payload,
        ...state,
      };

    case INCR_PAGE:
      return {
        currentPage: state.currentPage + 1,
        ...state,
      };

    case DECR_PAGE:
      return {
        currentPage: state.currentPage - 1,
        ...state,
      };

    default:
      return state;
  }
};
