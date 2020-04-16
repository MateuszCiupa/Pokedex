import React from "react";
import useStyles from "./useStyles";
import Grid from "@material-ui/core/Grid";
import PokeCard from "components/PokeCard";
import { connect } from "react-redux";
import { getSprite } from "util/pokemon";

const PokeGrid = ({ pokeBuffer, stats: { currentPage }, filter }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Grid container spacing={3}>
        {(filter.active
          ? filter.results[currentPage - 1]
          : pokeBuffer[currentPage - 1]
        ).map((pokemon) => (
          <PokeCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </Grid>
    </div>
  );
};

const mapStateToProps = ({ pokeBuffer, stats, filter }) => ({
  pokeBuffer,
  stats,
  filter,
});

export default connect(mapStateToProps)(PokeGrid);
