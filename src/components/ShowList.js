import React from 'react';
import { lighten, makeStyles } from '@material-ui/core/styles';
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
// import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import clsx from "clsx";
// import FilterListIcon from "@material-ui/icons/FilterList";

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
  title: {
  height: 5
}
});
export default function ShowList(props) {
  const classes = useStyles();
  // const [productIdArray, setproductIdArray] = React.useState([]);
  const [productId, setProduct] = React.useState('');
  const [index, setIndex] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);
  const isSelected = name => selected.indexOf(name) !== -1;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (event, name, productId) => {
    setProduct(productId)
    setIndex(name)
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    // console.log(newSelected)
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
    // console.log(newSelected)
    // console.log(productIdArray)
  };
  return (
    <Paper className={classes.root}>
    <EnhancedTableToolbar
      productId={productId}
      index={index}
      numSelected={selected.length}
      handleDelete={props.handleDelete}
      filter={props.filter}
       />
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                />
              </TableCell>
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
        const isItemSelected = isSelected(index);
        // console.log(isItemSelected)
        const labelId = `enhanced-table-checkbox-${index}`;
        return(
          <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
            key={index}
            aria-checked={isItemSelected}
            selected={isItemSelected}
            >
          <TableCell padding="checkbox">
            <Checkbox
              checked={isItemSelected}
              inputProps={{ "aria-labelledby": labelId }}
              onClick={event => handleClick(event, index, product.id)}
            />
          </TableCell>
            <TableCell
              id={labelId}
            >{product.product_name}</TableCell>
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

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  title: {
    flex: "1 1 100%"
  }
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected, productId, index } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >

      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton
            onClick={() => {props.handleDelete(productId,index, props.filter)}}
            aria-label="delete">
            <DeleteIcon
             />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};
