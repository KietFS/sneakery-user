import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

interface ISpinnerProps {
  size?: number;
}

const Spinner: React.FC<ISpinnerProps> = (props) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress size={props.size || 40} />
    </Box>
  );
};

export default Spinner;
