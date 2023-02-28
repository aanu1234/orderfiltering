import * as React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import { Link } from "react-router-dom";

export default function Content({ toggleDrawer }) {
  return (
    <Stack justifyContent="center" align="center" spacing={1}>
      <Typography sx={{ mt: 5, mx: 2, fontWeight: "bolder" }} variant="body1">
        What are you looking for?
      </Typography>
      <Typography variant="body2">
        Get started by searching & filtering a few
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button variant="contained" sx={{ mr: 1 }}>
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
