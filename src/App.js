import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { UsuarioRoute } from "./Componentes/UsuarioRoute";
import { Principal } from "./Vistas/Principal";
import { Login } from "./Vistas/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Principal} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
