import React, { useState } from "react";
import useStyles from "./useStyles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { allToUpper } from "util/string";
import PokeDetailsFade from "components/PokeDetailsFade";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

export default ({
  name = "Name",
  weight = "Weight",
  height = "Height",
  pokeId = "Id",
  imgUrl,
}) => {
  const [detailsFadeIn, setDetailsFadeIn] = useState(false);

  const classes = useStyles();
  return (
    <Grid item xs={12} sm={4} xl={2}>
      <ClickAwayListener onClickAway={() => setDetailsFadeIn(false)}>
        <Paper className={classes.paper}>
          <PokeDetailsFade
            fadeIn={detailsFadeIn}
            setFadeIn={setDetailsFadeIn}
          />
          <Grid container spacing={2}>
            <Grid item>
              <img className={classes.img} src={imgUrl} alt={`${name} img`} />
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
