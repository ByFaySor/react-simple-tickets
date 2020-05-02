import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Button from "@material-ui/core/Button";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ticket_logo from "../../assets/ticket.png";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import { useHistory } from "react-router-dom";
import { postLogin } from "../../utils/api";
import axios from "axios";

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

export default function Login() {
  const history = useHistory();
  const messageDefault = "Error intento, contacte al administrador";
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [transition, setTransition] = useState(undefined);
  const [messageSnackbar, setMessageSnackbar] = useState(messageDefault);

  const [formLogin, setFormLogin] = useState({
    email: "admin@example.com",
    password: "secret"
  });

  const handleRegister = (e) => {
    e.preventDefault();
    history.push("/register");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    postLogin(formLogin)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`
        history.push({
            pathname: "/perfil",
            state: {rol: response.data.user.rol},
        });
      })
      .catch((err) => {
        if (err.response) {
          setMessageSnackbar(err.response.data.message);
          setTransition(() => TransitionUp);
          setOpenSnackbar(true);
        }
      });
  }

  const handleClose = () => {
    setOpenSnackbar(false);
  };

  const updateField = e => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="page">
      <Container className="login-box">
        <img src={ticket_logo} alt="logo de ticket" className="img-center" />
        <h1 className="text-center">Ingresa por tús tickets</h1>
        <Divider />
        <form noValidate autoComplete="off" onSubmit={handleLogin}>
          <TextField
            id="email"
            name="email"
            label="Usuario o correo"
            placeholder="Escribir el nombre o correo de usuario"
            helperText="Tenga cuidado al ingresar los datos, verique mayúsculas y minúsculas"
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              ),
            }}
            value={formLogin.email || ""}
            onChange={updateField}
          />
          <TextField
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            label="Contraseña"
            placeholder="Escribir la contraseña"
            helperText="Tenga cuidado al ingresar los datos, verique los carácteres especiales"
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VpnKeyIcon />
                </InputAdornment>
              ),
            }}
            value={formLogin.password || ""}
            onChange={updateField}
          />
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="secondary"
                endIcon={<PersonAddIcon />}
                onClick={handleRegister}
                fullWidth
              >
                Registrarse
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                endIcon={<LockOpenIcon />}
                fullWidth
                type="submit"
              >
                Ingresar
              </Button>
            </Grid>
           </Grid>
        </form>
        <Snackbar
          open={openSnackbar}
          onClose={handleClose}
          autoHideDuration={6000}
          TransitionComponent={transition}
          message={messageSnackbar}
        >
        </Snackbar>
      </Container>
    </div>
  );
}