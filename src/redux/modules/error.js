const RECEIVE_ERROR = "pokedex/errors/RECEIVE_ERROR";
const CLEAR_ERROR = "pokedex/errors/CLEAR_ERROR";

export const receiveError = (message) => ({
  type: RECEIVE_ERROR,
  message,
});

export const clearError = () => ({
  type: CLEAR_ERROR,
});

export default (state = "", { type, message }) => {
  switch (type) {
    case RECEIVE_ERROR:
      return message;

    case CLEAR_ERROR:
    default:
      return "";
  }
};
