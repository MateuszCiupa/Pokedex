import React, { useEffect } from "react";
import PokeGrid from "components/PokeGrid";
import useStyles from "./useStyles";
import { connect } from "react-redux";
import { startLoading } from "redux/modules/pokeBuffer";
import { setCurrentPage } from "redux/modules/stats";
import Pagination from "@material-ui/lab/Pagination";
import Box from "@material-ui/core/Box";

const App = ({ stats: { pageCount }, startLoading, setCurrentPage }) => {
  useEffect(() => {
    startLoading();
  }, [startLoading]);

  const handlePageChange = (e, page) => {
    setCurrentPage(page);
  };

  const classes = useStyles();
  return (
    <div>
      <Box display={{ xs: "block", lg: "none" }}>
        <Pagination
          count={pageCount}
          size="small"
          onChange={handlePageChange}
          siblingCount={0}
          boundaryCount={1}
          color="primary"
          className={classes.fixedMiddleTop}
        />
      </Box>

      <Box display={{ xs: "none", lg: "block" }}>
        <Pagination
          count={pageCount}
          size="large"
          onChange={handlePageChange}
          siblingCount={1}
          boundaryCount={2}
          color="primary"
          className={classes.fixedMiddleTop}
        />
      </Box>

      <PokeGrid />
    </div>
  );
};

const mapStateToProps = ({ stats, loading }) => ({
  stats,
  loading,
});

const mapDispatchToProps = (dispatch) => ({
  startLoading: () => dispatch(startLoading()),
  setCurrentPage: (page) => dispatch(setCurrentPage(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
