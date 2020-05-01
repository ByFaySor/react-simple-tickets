import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Perfil from "./components/Perfil/Perfil";
import PageError from "./components/PageError/PageError";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import "./App.css";
import axios from "axios";

export default function App() {
  
  const [state, setState] = useState({
    rol: 0,
    pathname: "/login",
  });

  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    let userData = null;
    if (userInfo) {
      userData = JSON.parse(userInfo);
      setState({
        rol: userData.user.rol,
        pathname: "/perfil",
      });
    }
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status !== 401) {
          return Promise.reject(error);
        }
        localStorage.removeItem("user");
        setState({
          rol: 0,
          pathname: "/login",
        });
      }
    );
  }, [])

  return (
    <React.Fragment>
    <CssBaseline />
      <Container maxWidth="sm">
        <Router>
          <div>
            <NavBar />
            <Redirect
              from="/"
              to={{
                pathname: state.pathname,
                state: { rol: state.rol},
              }}
            />
            <Switch>
              <Route
                path="/login"
                component={Login}
              />
              <Route
                exact
                path="/register"
                render={() => <Register />}
              />
              <Route
                exact
                path="/perfil"
                render={() => <Perfil />}
              />
              <Route component={PageError} />
            </Switch>
          </div>
        </Router>
      </Container>
    </React.Fragment>
  );
}
