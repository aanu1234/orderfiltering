import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import FilterListIcon from "@mui/icons-material/FilterList";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import Drawer from "@mui/material/Drawer";
import { styled } from "@mui/material";
import { HFTextInput } from "./hook-form";
import Backdrop from "./backdrop";

import FilterPanel from "../pages/FilterPanel";
import { useDispatch, useSelector } from "react-redux";
import { searchOrders } from "../reducers/actions";

const lightColor = "rgba(255, 255, 255, 0.7)";

function Header(props) {
  const { open, toggleDrawer, onDrawerToggle } = props;
  const [searchItem, setSearchItem] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { totalProducts } = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  const StyledBox = styled(Box)(({ theme }) => ({
    height: "100%",
    width: "320px",
    backgroundColor: theme.palette.mode === "light" ? "#fff" : "#999",
  }));

  const handleChange = (e) => {
    e.preventDefault();
    setSearchItem(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const arrItems = [];
    const searchItems = searchItem.split(",");
    if (searchItems.length > 0) {
      searchItems.forEach((item) => arrItems.push(item.trim()));
    }
    try {
      setLoading(true);
      dispatch(searchOrders({ item: arrItems }));
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };

  if (loading) return <Backdrop loading />;

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid sx={{ display: { sm: "none", xs: "block" } }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs />
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5">
                Item search
              </Typography>
              <Typography variant="caption">{totalProducts} items</Typography>
            </Grid>
            <Grid item>
              <Box component="form" onSubmit={handleSubmit}>
                <HFTextInput
                  onChange={handleChange}
                  value={searchItem}
                  sx={{ borderColor: lightColor }}
                  id="input-with-icon-adornment"
                  placeholder="Search by item #, item #"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Grid>
            <Grid item>
              <Tooltip title="Add">
                <IconButton color="inherit">
                  <AddBoxOutlinedIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Bookmark">
                <IconButton color="inherit">
                  <BookmarkBorderIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Filter">
                <IconButton color="inherit" onClick={toggleDrawer}>
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
        <StyledBox>
          <FilterPanel />
        </StyledBox>
      </Drawer>
    </React.Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
