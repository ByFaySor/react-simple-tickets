import React, { Component } from "react";
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

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      rol: 0,
      pathname: "/login",
    };
    const userInfo = localStorage.getItem("user");
    let userData = null;
    if (userInfo) {
      userData = JSON.parse(userInfo);
      this.state = {
        rol: userData.user.rol,
        pathname: "/perfil",
      };
    }
  }

  render() {
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
                  pathname: this.state.pathname,
                  state: { rol: this.state.rol},
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
}
export default App;
