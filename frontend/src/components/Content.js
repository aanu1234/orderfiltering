import * as React from "react";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import { fetchAllOrders } from "../reducers/actions";

export default function Content({ toggleDrawer }) {
  const [loading, setLoading] = React.useState();
  const dispatch = useDispatch();

  const handleFetchData = () => {
    setLoading(true);
    try {
      dispatch(fetchAllOrders());
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <Stack justifyContent="center" align="center" spacing={1}>
      <Typography sx={{ mt: 5, mx: 2, fontWeight: "bolder" }} variant="body1">
        What are you looking for?
      </Typography>
      <Typography variant="body2">
        Get started by searching & filtering a few
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button
          variant="contained"
          onClick={handleFetchData}
          sx={{ mr: 1 }}
          disabled={loading}
        >
          Fetch Data
        </Button>
      </Box>
      <Typography variant="caption" sx={{ cursor: "pointer" }}>
        or&nbsp;
        <span component={Link} to="#" onClick={toggleDrawer}>
          search for an item
        </span>
      </Typography>
    </Stack>
  );
}
