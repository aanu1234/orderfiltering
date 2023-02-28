import { Button } from "@mui/material";

const HFButton = ({ text, ...others }) => {
  return (
    <Button variant="contained" {...others}>
      {text}
    </Button>
  );
};

export default HFButton;
