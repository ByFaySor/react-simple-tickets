import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import { getList, postSolicit } from "../../utils/api";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'ticket', disablePadding: false, label: 'Ticket', minWidth: 1 },
  { id: 'status', disablePadding: false, label: 'Estatus', minWidth: 1 },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ minWidth: headCell.minWidth }}
            align="center"
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

export default function PerfilUser() {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const messageDefault = "Error intento, contacte al administrador";
  const [open, setOpen] = useState(false);
  const [list, setList] = useState(false);
  const [transition, setTransition] = useState(undefined);
  const [messageSnackbar, setMessageSnackbar] = useState(messageDefault);
  const [rows, setRows] = useState([]);

  const columns = [
    {
      id: 'ticket',
      label: 'Ticket',
      align: 'center',
    },
    {
      id: 'status',
      label: 'Estatus',
      align: 'center',
    },
  ];

  function createData(ticket, status) {
    return { ticket, status };
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSolicit = (event) => {
    event.preventDefault();
    postSolicit()
      .then((response) => {
        handleRefreshList();
      })
      .catch((err) => {
        setMessageSnackbar(err.message);
        setTransition(() => TransitionUp);
        setOpen(true);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRefreshList = () => {
    getList()
        .then((response) => {
          let rowTickets = [];
          response.data.map((ticket) => {
            rowTickets.push(createData(`#${ticket.code}`, ticket.code === "" ? "EN ESPERA": "APROBADO"));
            return rowTickets;
          });
          setRows(rowTickets);
        })
        .catch((err) => {
          setMessageSnackbar("No existen registros");
          setTransition(() => TransitionUp);
          setOpen(true);
        });
      setList(true);
  };

  useEffect(() => {
    if (!list) {
      handleRefreshList();
    }
  });

  return (
    <Paper className={classes.root}>
      <br />
      <Button
        variant="contained"
        color="primary"
        style={{ width: '80%', margin: '0 auto', display: 'block' }}
        endIcon={<ConfirmationNumberIcon />}
        onClick={handleSolicit}
        fullWidth
        size="small"
      >
        Solicitar Ticket
      </Button>
      <br />
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <EnhancedTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.ticket}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 40]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <Snackbar
          open={open}
          onClose={handleClose}
          autoHideDuration={6000}
          TransitionComponent={transition}
          message={messageSnackbar}
        >
      </Snackbar>
    </Paper>
  );
}