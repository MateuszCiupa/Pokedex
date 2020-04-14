import React from "react";
import useStyles from "./useStyles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { allToUpper } from "util/string";

export default ({
  name = "Name",
  weight = "Weight",
  height = "Height",
  pokeId = "Id",
  imgUrl,
}) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={4} xl={2}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <img className={classes.img} src={imgUrl} alt={`${name} img`} />
          </Grid>
          <Grid item container xs>
            <Grid item container direction="column" spacing={2}>
              <Grid item>
                <Typography variant="subtitle1">{allToUpper(name)}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Height {height}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Weight {weight}
                </Typography>
              </Grid>
              <Grid item>
                <Button>More</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
