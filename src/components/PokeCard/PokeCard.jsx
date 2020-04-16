import React, { useState } from "react";
import useStyles from "./useStyles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { allToUpper } from "util/string";
import PokeDetailsFade from "components/PokeDetailsFade";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { getSprite } from "util/pokemon";

export default ({
  pokemon: {
    name = "Name",
    weight = "Weight",
    height = "Height",
    id: pokeId,
    types,
    abilities,
    sprites,
    base_experience,
  },
}) => {
  const [detailsFadeIn, setDetailsFadeIn] = useState(false);

  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <ClickAwayListener onClickAway={() => setDetailsFadeIn(false)}>
        <Paper
          className={classes.paper}
          onClick={() => !detailsFadeIn && setDetailsFadeIn(true)}
        >
          <PokeDetailsFade
            fadeIn={detailsFadeIn}
            setFadeIn={setDetailsFadeIn}
            types={types}
            abilities={abilities}
            base_experience={base_experience}
            pokeId={pokeId}
            name={allToUpper(name)}
          />
          <Grid container spacing={2}>
            <Grid item>
              <img
                className={classes.img}
                src={getSprite(sprites)}
                alt={`${name} img`}
              />
            </Grid>
            <Grid item container xs>
              <Grid item container direction="column" spacing={2}>
                <Grid item>
                  <Typography variant="subtitle1">
                    {allToUpper(name)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Height {height}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Weight {weight}
                  </Typography>
                </Grid>
                <Grid item style={{ alignSelf: "flex-end" }}>
                  <Button onClick={() => setDetailsFadeIn((prev) => !prev)}>
                    {detailsFadeIn ? "Less" : "More"}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </ClickAwayListener>
    </Grid>
  );
};
