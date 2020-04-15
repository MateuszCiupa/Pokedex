import makeStyles from "@material-ui/core/styles/makeStyles";

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    position: "relative",
    overflow: "hidden",
  },
  img: {
    margin: "auto",
    display: "block",
    width: 96,
    height: 115,
  },
}));
