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
    width: 92,
    height: 92,
  },
  image: {
    width: 128,
    height: 128,
  },
}));
