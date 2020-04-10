import { getTypes } from "util/pokemon";
import { receiveError } from "./error";

export const REQUEST_TYPES = "pokedex/types/REQUEST_TYPES";

const _requestTypes = (payload) => ({
  type: REQUEST_TYPES,
  payload,
});

export const requestTypes = () => async (dispatch) => {
  try {
    const response = await getTypes();
    if (!response.ok) throw new Error(response.status);
    const { results } = await response.json();
    dispatch(_requestTypes(results));
  } catch (e) {
    console.log(e);
    dispatch(receiveError("Problem while loading types"));
  }
};

export default (state = [], { type, payload }) => {
  switch (type) {
    case REQUEST_TYPES:
      return payload;

    default:
      return state;
  }
};
