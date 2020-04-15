import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import TextField from '@material-ui/core/TextField';

const columns = [
  { id: 'product_name', label: 'Product Name', width: 200 },
  { id: 'qty', label: 'Quantity', width: 200 },
  { id: 'price', label: 'Price', width: 200 },
  { id: 'button', label: '', width: 200 }
];
const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 550,
  },
});
export default function ShowList(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ width: column.width }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
      {props.inventory.map((product, index) => {
        console.log(product, index);
        return(
          <TableRow hover role="checkbox" tabIndex={-1} key={index}>
            <TableCell>{product.product_name}</TableCell>
            <TableCell>{product.qty}</TableCell>
            <TableCell>${product.price}</TableCell>
            <TableCell>
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={() => { props.handleAdd(product)}}
                ><AddIcon/>
              </Button>
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={() => { props.handleSubtract(product)}}
                ><RemoveIcon />
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={() => {props.handleDelete(product.id, index, props.filter)}}
              >
                <DeleteIcon />
              </Button>
            </TableCell>
          </TableRow>
        )
      })}
        </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.inventory.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
