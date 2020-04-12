import { POKE_DISPLAY_LIMIT, pokeCountUrl } from "util/pokemon";
import { receiveError } from "./error";

const SET_POKE_COUNT = "pokedex/stats/SET_POKE_COUNT";
const SET_PAGE_LIMIT = "pokedex/stats/SET_PAGE_LIMIT";
const INCR_PAGE = "pokedex/stats/INCR_PAGE";
const DECR_PAGE = "pokedex/stats/DECR_PAGE";
const SET_LEFT_LIMIT = "pokedex/stats/SET_LEFT_LIMIT";
const SET_RIGHT_LIMIT = "pokedex/stats/SET_RIGHT_LIMIT";

const initialState = {
  pokeCount: undefined,
  currentPage: 0,
  pageLimit: POKE_DISPLAY_LIMIT,
  leftLimit: true,
  rightLimit: false,
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

export const setLeftLimit = (payload) => ({
  type: SET_LEFT_LIMIT,
  payload,
});

export const setRightLimit = (payload) => ({
  type: SET_RIGHT_LIMIT,
  payload,
});

export const updateLimits = () => (dispatch, getState) => {
  const { pokemon, stats } = getState();
  const { offset, limit } = pokemon;
  const { pokeCount } = stats;

  dispatch(setLeftLimit(!(offset > 0)));
  dispatch(setRightLimit(!(offset + limit < pokeCount)));
};

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
        ...state,
        pokeCount: payload,
      };

    case SET_PAGE_LIMIT:
      return {
        ...state,
        pageLimit: payload,
      };

    case INCR_PAGE:
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };

    case DECR_PAGE:
      return {
        ...state,
        currentPage: state.currentPage - 1,
      };

    case SET_RIGHT_LIMIT:
      return {
        ...state,
        rightLimit: !!payload,
      };

    case SET_LEFT_LIMIT:
      return {
        ...state,
        leftLimit: !!payload,
      };

    default:
      return state;
  }
};
