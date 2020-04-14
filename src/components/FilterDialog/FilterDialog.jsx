import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { setFilterActive, clearFilter } from "redux/modules/filter";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

const FilterDialog = ({
  open,
  setOpen,
  filter,
  clearFilter,
  setFilterActive,
}) => {
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      onEnter={() => {
        setWeight(filter.weight ? filter.weight : [1, 9999]);
        setHeight(filter.height ? filter.height : [1, 145]);
      }}
      disableScrollLock
      fullWidth
    >
      <DialogTitle>Filter Pokémons</DialogTitle>
      <DialogContent>
        <Typography gutterBottom>Height</Typography>
        <Slider
          min={1}
          max={145}
          value={height}
          onChange={(e, value) => setHeight(value)}
          valueLabelDisplay="auto"
        />
        <Typography gutterBottom>Weight</Typography>
        <Slider
          min={1}
          max={9999}
          value={weight}
          onChange={(e, value) => setWeight(value)}
          valueLabelDisplay="auto"
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setOpen(false);
            clearFilter();
          }}
        >
          Clear
        </Button>
        <Button
          color="primary"
          onClick={() => {
            setOpen(false);
            setFilterActive({ height, weight });
          }}
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = ({ filter }) => ({
  filter,
});

const mapDispatchToProps = (dispatch) => ({
  setFilterActive: (payload) => dispatch(setFilterActive(payload)),
  clearFilter: () => dispatch(clearFilter()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterDialog);
