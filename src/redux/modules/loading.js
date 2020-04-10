const RECEIVE_LOADING = "pokedex/loading/RECEIVE_LOADING";

export const receiveLoading = (loading) => ({
  type: RECEIVE_LOADING,
  loading,
});

export default (state = false, { type, loading }) => {
  switch (type) {
    case RECEIVE_LOADING:
      return !!loading;

    default:
      return state;
  }
};
