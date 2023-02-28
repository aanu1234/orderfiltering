import { useState } from "react";
import * as api from "../api";

// @mui
import {
  CardActions,
  Collapse,
  Box,
  Divider,
  Stack,
  styled,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

// component
import { HFTextInput, HFButton } from "../components/hook-form";
import Snackbar from "../components/snackbar";
import MainCard from "../components/card/MainCard";

import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

const SearchForm = () => {
  const [expandedOrder, setExpandedOrder] = useState(false);
  const [expandedItem, setExpandedItem] = useState(false);
  const [expandedType, setExpandedType] = useState(false);

  const handleExpandTypeClick = () => {
    setExpandedType(!expandedType);
  };
  const handleExpandItemClick = () => {
    setExpandedItem(!expandedItem);
  };
  const handleExpandOrderClick = () => {
    setExpandedOrder(!expandedOrder);
  };

  const defaultValues = {
    order: "",
    item: "",
    type: "",
  };
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [formdata, setFormdata] = useState(defaultValues);
  const { item, order, type } = formdata;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(formdata);
      const { data } = api.getOrders(formdata);
      if (data?.status !== "success") throw new Error("Something went wrong");
      // set new data
      setSuccess(true);
      setMessage("Please wait...");
    } catch (error) {
      setMessage(error.message);
    }
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

  return (
    <MainCard
      title="Set Parameters"
      subheader="9 parameters available"
      sx={{ overflow: "auto", height: "100%", maxHeight: 700 }}
    >
      {error && <Snackbar open={error} severity="error" message={message} />}
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
          <HFButton type="submit" text="Apply" />
        </CardActions>
      </Box>
    </MainCard>
  );
};

export default SearchForm;
