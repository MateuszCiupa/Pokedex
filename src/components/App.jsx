import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPokeFirst, getPokeNext } from "redux/modules/pokemon";

const App = ({ pokemon, loading, error, getPokeFirst, getPokeNext, stats }) => {
  useEffect(() => {
    getPokeFirst();
  }, [getPokeFirst]);

  useEffect(() => {
    console.log(pokemon);
  }, [pokemon]);

  return (
    <div>
      {pokemon.results.map(({ name, weight, height }) => (
        <div key={name}>
          Name: {name}, weight: {weight}, height: {height}
        </div>
      ))}
      <button disabled={loading} onClick={getPokeNext}>
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
  getPokeFirst: () => dispatch(getPokeFirst()),
  getPokeNext: () => dispatch(getPokeNext()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
