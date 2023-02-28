import { useState } from "react";
import { useDispatch } from "react-redux";

// @mui
import {
  CardActions,
  Collapse,
  Box,
  Divider,
  IconButton,
  Stack,
  styled,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

// components
import { HFTextInput, HFButton } from "../components/hook-form";
import Snackbar from "../components/snackbar";
import MainCard from "../components/card/MainCard";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// reducers
import { searchOrders } from "../reducers/actions";
import { RESET_ALL } from "../reducers/constants";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const defaultValues = { order: "", item: "", type: "" };

const SearchForm = () => {
  const [expandedOrder, setExpandedOrder] = useState(false);
  const [expandedItem, setExpandedItem] = useState(false);
  const [expandedType, setExpandedType] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [formdata, setFormdata] = useState(defaultValues);
  const { item, order, type } = formdata;
  const dispatch = useDispatch();

  const handleExpandTypeClick = () => {
    setExpandedType(!expandedType);
  };
  const handleExpandItemClick = () => {
    setExpandedItem(!expandedItem);
  };
  const handleExpandOrderClick = () => {
    setExpandedOrder(!expandedOrder);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const re = /^[0-9, \b]+$/;
    if (["item"].includes(name) && !re.test(value) && value !== "") {
      setError(true);
      setErrorMessage("item must be digit only");
      return;
    }

    setError(false);
    setErrorMessage("");

    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      dispatch(searchOrders(formdata));
      setSuccess(true);
    } catch (error) {
      setMessage(error.message);
    }
    setLoading(false);
  };

  const handleResetAll = () => {
    dispatch({ type: RESET_ALL });
  };

  return (
    <MainCard
      title="Set Parameters"
      subheader="9 parameters available"
      secondary={
        <Typography
          sx={{ cursor: "pointer" }}
          variant="caption"
          onClick={handleResetAll}
        >
          Reset all
        </Typography>
      }
      sx={{ overflow: "auto", height: "100%", maxHeight: 700 }}
    >
      {error && (
        <Snackbar open={error} severity="error" message={errorMessage} />
      )}
      {success && (
        <Snackbar open={success} severity="success" message={message} />
      )}
      <Box onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center">
            <Typography>Item</Typography>
            <ExpandMore expand={expandedItem} onClick={handleExpandItemClick}>
              <ExpandMoreIcon />
            </ExpandMore>
          </Stack>
          <Collapse in={expandedItem} timeout="auto" unmountOnExit>
            <HFTextInput
              error={error}
              sx={{ width: "100%" }}
              placeholder="Item ID (Ex. 715272404)"
              multiline
              rows={3}
              name="item"
              value={item}
              onChange={handleChange}
              helperText={errorMessage}
            />
          </Collapse>
          <Divider />
          <Stack direction="row" alignItems="center">
            <Typography>Order #</Typography>
            <ExpandMore expand={expandedOrder} onClick={handleExpandOrderClick}>
              <ExpandMoreIcon />
            </ExpandMore>
          </Stack>
          <Collapse in={expandedOrder} timeout="auto" unmountOnExit>
            <HFTextInput
              sx={{ width: "100%" }}
              placeholder="Order ID (Ex. 836920616903)"
              multiline
              rows={3}
              name="order"
              value={order}
              onChange={handleChange}
            />
          </Collapse>
          <Divider />
          <Stack direction="row" alignItems="center">
            <Typography>Type</Typography>
            <ExpandMore expand={expandedType} onClick={handleExpandTypeClick}>
              <ExpandMoreIcon />
            </ExpandMore>
          </Stack>
          <Collapse in={expandedType} timeout="auto" unmountOnExit>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox name="all" />}
                label="Show all"
              />
              <FormControlLabel
                control={<Checkbox name="cao" value={type} />}
                label="CAO"
              />
              <FormControlLabel
                control={<Checkbox name="edf" value={type} />}
                label="EDF"
              />
            </FormGroup>
          </Collapse>
        </Stack>
        <Box mt={5}></Box>
        <Divider />
        <CardActions>
          <HFButton type="submit" text="Cancel" />
          <HFButton type="submit" text="Apply" disabled={loading} />
        </CardActions>
      </Box>
    </MainCard>
  );
};

export default SearchForm;
