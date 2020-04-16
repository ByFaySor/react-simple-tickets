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
import SaveIcon from "@material-ui/icons/Save";
import MailIcon from "@material-ui/icons/Mail";
import ticket_logo from "../../assets/ticket.png";
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import { useHistory } from "react-router-dom";
import { postRegister } from "../../utils/api";

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

export default function Register() {
  const history = useHistory();
  const messageDefault = "Error intento, contacte al administrador";
  const [open, setOpen] = useState(false);
  const [transition, setTransition] = useState(undefined);
  const [messageSnackbar, setMessageSnackbar] = useState(messageDefault);

  const [formRegister, setFormRegister] = useState({
    name: "faysor",
    email: "faysor@example.com",
    password: "faysor",
    password_confirmation: "faysor",
  });

  const handleRegister = (event) => {
    event.preventDefault();
    postRegister(formRegister)
      .then((response) => {
        if (response.data.user.original.success) {
          history.push("/login");
        }
        setMessageSnackbar(response.data.message);
        setTransition(() => TransitionUp);
        setOpen(true);
      })
      .catch((err) => {
        setMessageSnackbar(messageDefault);
        setTransition(() => TransitionUp);
        setOpen(true);
      });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    history.push("/login");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateField = e => {
    setFormRegister({
      ...formRegister,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="page">
      <Container className="login-box">
        <img src={ticket_logo} alt="logo de ticket" className="img-center" />
        <h1 className="text-center">Registrarse </h1>
        <Divider />
        <form noValidate autoComplete="off" onSubmit={handleRegister}>
          <TextField
            id="name"
            name="name"
            label="Usuario"
            placeholder="Escribir el nombre de usuario"
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
            value={formRegister.name || ""}
            onChange={updateField}
          />
          <TextField
            id="email"
            name="email"
            label="Correo electrónico"
            placeholder="Escribir el correo electrónico"
            helperText="Tenga cuidado al ingresar los datos, verique mayúsculas y minúsculas"
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailIcon />
                </InputAdornment>
              ),
            }}
            value={formRegister.email || ""}
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
            value={formRegister.password || ""}
            onChange={updateField}
          />
          <TextField
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            autoComplete="current-password"
            label="Repetir contraseña"
            placeholder="Escribir nuevamente la contraseña"
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
            value={formRegister.password_confirmation || ""}
            onChange={updateField}
          />
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="secondary"
                endIcon={<LockOpenIcon />}
                onClick={handleLogin}
                fullWidth
              >
                Iniciar sesión
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                endIcon={<SaveIcon />}
                fullWidth
                type="submit"
              >
                Crear
              </Button>
            </Grid>
           </Grid>
        </form>
        <Snackbar
          open={open}
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