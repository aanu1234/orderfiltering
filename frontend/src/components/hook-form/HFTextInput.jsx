import { TextField } from "@mui/material";

const HFTextInput = ({ type, value, ...others }) => {
  return (
    <TextField
      size="small"
      variant="outlined"
      type={type ? type : "text"}
      value={value}
      {...others}
    />
  );
};

export default HFTextInput;
