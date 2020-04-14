import { POKE_DISPLAY_LIMIT } from "util/pokemon";
import { RECEIVE_BUFFER_RESULT } from "./pokeBuffer";
import shouldFilter, { compareNumFilters } from "util/filter";
import { setCurrentPage } from "./stats";

const CLEAR_FILTER = "pokedex/filter/CLEAR_FILTER";
const SET_FIRST_ID = "pokedex/filter/SET_FIRST_ID";
const RECEIVE_FILTER_RESULT = "pokedex/filter/RECEIVE_FILTER_RESULT";
const INIT_FILTER_BUFFER = "pokedex/filter/INIT_FILTER_BUFFER";
const SET_FILTER_ACTIVE = "pokedex/filter/SET_FILTER_ACTIVE";

export const _clearFilter = () => ({
  type: CLEAR_FILTER,
});

export const clearFilter = () => (dispatch, getState) => {
  const { filter } = getState();
  if (filter.active) {
    dispatch(setCurrentPage(1));
    dispatch(_clearFilter());
  }
};

export const setFirstId = (payload) => ({
  type: SET_FIRST_ID,
  payload,
});

const initFilterBuffer = () => ({
  type: INIT_FILTER_BUFFER,
});

const receiveFilterResult = (payload) => ({
  type: RECEIVE_FILTER_RESULT,
  payload,
});

export const setFilterActive = ({ weight, height, type }) => (
  dispatch,
  getState
) => {
  const { filter } = getState();
  if (
    (!!weight && !compareNumFilters(weight, filter.weight)) ||
    (!!height && !compareNumFilters(height, filter.height)) ||
    !!type
  ) {
    dispatch({
      type: SET_FILTER_ACTIVE,
      payload: { weight, height, type },
    });
    dispatch(setCurrentPage(1));
    dispatch(startFiltering());
  }
};

export const startFiltering = () => (dispatch, getState) => {
  dispatch(initFilterBuffer());

  const { pokeBuffer } = getState();
  for (let page of pokeBuffer) {
    for (let poke of page) {
      dispatch(receiveFilterResult(poke));
    }
  }
};

const initialState = {
  active: false,
  firstId: null,
  type: null,
  weight: null,
  height: null,
  results: [[]],
  pageCount: 1,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CLEAR_FILTER:
      return {
        ...state,
        active: false,
        weight: null,
        height: null,
        type: null,
        results: [[]],
        pageCount: 1,
      };

    case SET_FIRST_ID:
      return {
        ...state,
        firstId: payload,
      };

    case INIT_FILTER_BUFFER:
      return {
        ...state,
        pageCount: 1,
        results: [[]],
      };

    case SET_FILTER_ACTIVE:
      return {
        ...state,
        ...payload,
        active: true,
      };

    case RECEIVE_BUFFER_RESULT:
    case RECEIVE_FILTER_RESULT:
      if (!state.active || shouldFilter(payload, state)) return state;
      const lastPageFiltered = state.results[state.results.length - 1].length;
      if (lastPageFiltered < POKE_DISPLAY_LIMIT)
        return {
          ...state,
          results: [
            ...state.results.slice(0, state.results.length - 1),
            [...state.results[state.results.length - 1], payload],
          ],
        };

      return {
        ...state,
        pageCount: state.pageCount + 1,
        results: [...state.results, [payload]],
      };

    default:
      return state;
  }
};
