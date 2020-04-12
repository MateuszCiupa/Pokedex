import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPokeMax, getPokePrevious } from "redux/modules/pokemon";

const App = ({
  pokemon,
  loading,
  error,
  getPokeMax,
  stats: { rightLimit, leftLimit },
  getPokePrevious,
}) => {
  useEffect(() => {
    getPokeMax();
  }, [getPokeMax]);

  return (
    <div>
      {pokemon.results.map(({ name, weight, height, id }) => (
        <div key={name}>
          Name: {name}, weight: {weight}, height: {height}, IDDDD: {id}
        </div>
      ))}
      <button disabled={loading || leftLimit} onClick={getPokePrevious}>
        Previous
      </button>
      <button disabled={loading || rightLimit} onClick={getPokeMax}>
        Next
      </button>
    </div>
  );
};

const mapStateToProps = ({ pokemon, loading, error, stats }) => ({
  pokemon,
  loading,
  error,
  stats,
});

const mapDispatchToProps = (dispatch) => ({
  getPokeMax: () => dispatch(getPokeMax()),
  getPokePrevious: () => dispatch(getPokePrevious()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
