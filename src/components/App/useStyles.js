import makeStyles from "@material-ui/core/styles/makeStyles";

export default makeStyles((theme) => ({
  root: {},
  fixedLeftBottom: {
    position: "fixed",
    bottom: theme.spacing(4),
    left: theme.spacing(4),
  },
  fixedRightBottom: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
  fixedMiddleBottom: {
    position: "fixed",
    bottom: theme.spacing(4),
    left: "50%",
    transform: "translate(-50%, 0)",
  },
  fixedMiddleTop: {
    position: "fixed",
    top: theme.spacing(2),
    left: "50%",
    transform: "translate(-50%, 0)",
  },
  pokeGrid: {
    marginTop: theme.spacing(4),
  },
  fixedTop: {
    position: "fixed",
    top: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));
