import React from "react";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import useStyles from "./useStyles";

export default ({ fadeIn }) => {
  const classes = useStyles();
  return (
    <Fade in={fadeIn}>
      <Paper className={classes.paper}>
        <Typography>elo</Typography>
      </Paper>
    </Fade>
  );
};
