import { POKE_DISPLAY_LIMIT } from "util/pokemon";
import { RECEIVE_BUFFER_RESULT } from "./pokeBuffer";

const SET_POKE_COUNT = "pokedex/stats/SET_POKE_COUNT";
const INCR_PAGE = "pokedex/stats/INCR_PAGE";
const DECR_PAGE = "pokedex/stats/DECR_PAGE";
const SET_LEFT_LIMIT = "pokedex/stats/SET_LEFT_LIMIT";
const SET_RIGHT_LIMIT = "pokedex/stats/SET_RIGHT_LIMIT";
const SET_CURRENT_PAGE = "pokedex/stats/SET_CURRENT_PAGE";
const SET_PAGE_COUNT = "pokedex/stats/SET_PAGE_COUNT";

const initialState = {
  pokeCount: undefined,
  pageCount: 1,
  currentPage: 1,
  leftLimit: true,
  rightLimit: false,
};

export const setPokeCount = (payload) => ({
  type: SET_POKE_COUNT,
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

export const setCurrentPage = (payload) => ({
  type: SET_CURRENT_PAGE,
  payload,
});

export const setPageCount = (payload) => ({
  type: SET_PAGE_COUNT,
  payload,
});

export default (state = initialState, { type, payload, index }) => {
  switch (type) {
    case SET_POKE_COUNT:
      return {
        ...state,
        pokeCount: payload,
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

    case SET_CURRENT_PAGE:
      if (payload <= 0 || payload > state.pageCount) return state;
      return {
        ...state,
        currentPage: payload,
      };

    case RECEIVE_BUFFER_RESULT:
      const page = Math.ceil(index / POKE_DISPLAY_LIMIT);
      if (state.pageCount < page)
        return {
          ...state,
          pageCount: page,
        };
      return state;

    default:
      return state;
  }
};
