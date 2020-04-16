import React, {useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ticket_logo from "../../assets/ticket.png";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar() {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const [auth, setAuth] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseSession = (event) => {
    event.preventDefault();
    setAuth(false);
    localStorage.removeItem("user");
    history.push("/login");
  };

  useEffect(() => {
    try {
      if (location.state.rol > 0) {
        setAuth(true);
      }
    } catch(e) {
      // error
    }
  }, [location]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <img src={ticket_logo} alt="logo de ticket" style={{ width: '3em', marginRight: '0.5em'}} /> 
          <Typography variant="h6" className={classes.title}>
            FSTicket
          </Typography>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleCloseSession}>Cerrar sesión</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}