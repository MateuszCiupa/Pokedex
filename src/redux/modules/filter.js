const CLEAR_FILTER = "pokedex/filter/CLEAR_FILTER";
const SET_FILTER = "pokedex/filter/SET_FILTER";

const _setFilter = (payload) => ({
  type: SET_FILTER,
  payload,
});

export const clearFilter = () => ({
  type: CLEAR_FILTER,
});

export const setFilter = (filter) => (dispatch) => {
  const payload = {};
  if (typeof filter === "object")
    for (const prop in filter) if (!!filter[prop]) payload[prop] = filter[prop];
  if (Object.keys(payload).length > 0) dispatch(_setFilter(payload));
};

const initialState = {
  active: false,
  type: null,
  weight: null,
  height: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CLEAR_FILTER:
      return {
        active: false,
        ...state,
      };

    case SET_FILTER:
      return {
        active: true,
        ...payload,
      };

    default:
      return state;
  }
};
