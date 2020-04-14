import React from "react";
import useStyles from "./useStyles";
import Grid from "@material-ui/core/Grid";
import PokeCard from "components/PokeCard";
import { connect } from "react-redux";
import { getSprite } from "util/pokemon";

const PokeGrid = ({ pokeBuffer, stats: { currentPage } }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Grid container spacing={3}>
        {pokeBuffer.length >= currentPage &&
          pokeBuffer[
            currentPage - 1
          ].map(({ name, weight, height, id, sprites }) => (
            <PokeCard
              key={name}
              name={name}
              imgUrl={getSprite(sprites)}
              weight={weight}
              height={height}
              pokeId={id}
            />
          ))}
      </Grid>
    </div>
  );
};

const mapStateToProps = ({ pokeBuffer, stats }) => ({
  pokeBuffer,
  stats,
});

export default connect(mapStateToProps)(PokeGrid);
