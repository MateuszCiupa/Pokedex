import React from "react";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import useStyles from "./useStyles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

export default ({ fadeIn, setFadeIn }) => {
  const classes = useStyles();
  return (
    <ClickAwayListener
      onClickAway={() => {
        if (fadeIn) setFadeIn(false);
      }}
    >
      <Fade in={fadeIn} onEnter={() => setFadeIn(true)}>
        <Paper className={classes.paper}>
          <Typography>elo</Typography>
        </Paper>
      </Fade>
    </ClickAwayListener>
  );
};
