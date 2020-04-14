import makeStyles from "@material-ui/core/styles/makeStyles";

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
  },
  img: {
    margin: "auto",
    display: "block",
    widthMax: "100%",
    heightMax: "100%",
  },
  image: {
    width: 128,
    height: 128,
  },
}));
