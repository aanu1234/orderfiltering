import "./table.css";

// @mui
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const OrderTable = ({ products }) => {
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell"></TableCell>
            <TableCell className="tableCell">Order #</TableCell>
            <TableCell className="tableCell">Type</TableCell>
            <TableCell className="tableCell">Item</TableCell>
            <TableCell className="tableCell">Category</TableCell>
            <TableCell className="tableCell">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row, index) => (
            <TableRow key={row._id} sx={{ cursor: "pointer" }}>
              <TableCell className="tableCell">{index + 1}</TableCell>
              <TableCell className="tableCell">{row.order}</TableCell>
              <TableCell className="tableCell"> {row.type}</TableCell>
              <TableCell className="tableCell">{row.item}</TableCell>
              <TableCell className="tableCell">{row.category}</TableCell>
              <TableCell className="tableCell">{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
