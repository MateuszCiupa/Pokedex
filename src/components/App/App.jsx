import React, { useEffect, useState } from "react";
import PokeGrid from "components/PokeGrid";
import useStyles from "./useStyles";
import { connect } from "react-redux";
import { startLoading } from "redux/modules/pokeBuffer";
import { setCurrentPage } from "redux/modules/stats";
import Pagination from "@material-ui/lab/Pagination";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import SortIcon from "@material-ui/icons/Sort";
import FilterDialog from "components/FilterDialog";

const App = ({
  stats: { pageCount, currentPage },
  startLoading,
  setCurrentPage,
  filter,
}) => {
  useEffect(() => {
    startLoading();
  }, [startLoading]);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handlePageChange = (e, page) => {
    setCurrentPage(page);
  };

  const classes = useStyles();
  return (
    <div>
      <Fab
        variant="extended"
        className={classes.fixedRightBottom}
        onClick={() => setDialogOpen(true)}
      >
        <SortIcon className={classes.extendedIcon} />
        Filter
      </Fab>

      <FilterDialog open={dialogOpen} setOpen={setDialogOpen} />

      <Box display={{ xs: "block", sm: "none" }}>
        <Pagination
          page={currentPage}
          count={filter.active ? filter.pageCount : pageCount}
          size="small"
          onChange={handlePageChange}
          siblingCount={0}
          boundaryCount={1}
          color="primary"
          className={classes.fixedMiddleTop}
        />
      </Box>

      <Box display={{ xs: "none", sm: "block" }}>
        <Pagination
          page={currentPage}
          count={filter.active ? filter.pageCount : pageCount}
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

const mapStateToProps = ({ stats, loading, filter }) => ({
  stats,
  loading,
  filter,
});

const mapDispatchToProps = (dispatch) => ({
  startLoading: () => dispatch(startLoading()),
  setCurrentPage: (page) => dispatch(setCurrentPage(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
