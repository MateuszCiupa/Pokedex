import React from "react";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import useStyles from "./useStyles";

export default ({
  fadeIn,
  base_experience = 0,
  abilities = [{ ability: { name: "ability" } }],
  types = [{ type: { name: "type" } }],
  pokeId = 0,
  name = "name",
  setFadeIn,
}) => {
  const classes = useStyles();
  return (
    <Fade in={fadeIn}>
      <Paper className={classes.paper} onClick={() => setFadeIn(false)}>
        <Typography variant="button">{name}</Typography>
        <Typography variant="subtitle2">
          {`Abilit${abilities.length > 1 ? "ies" : "y"}: `}
          {abilities.map(
            ({ ability: { name } }, idx) =>
              `${name}${idx !== abilities.length - 1 ? ", " : ""}`
          )}
        </Typography>
        <Typography variant="subtitle2">
          {`Type${types.length > 1 ? "s" : ""}: `}
          {types.map(
            ({ type: { name } }, idx) =>
              `${name}${idx !== types.length - 1 ? ", " : ""}`
          )}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Base experience: {base_experience}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Poke Id: {pokeId}
        </Typography>
      </Paper>
    </Fade>
  );
};
