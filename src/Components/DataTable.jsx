import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const DataTable = ({ headers, initialData }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {initialData.map((item) => (
            <TableRow key={item.id}>
              {headers.map((header) => (
                <TableCell key={header}>{item[header]}</TableCell>
              ))}
            </TableRow>
          ))}
          {!initialData?.length && (
            <TableRow>
              <TableCell colSpan={headers.length} align="center">
                <Typography color="textSecondary">
                  No matching data found
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
