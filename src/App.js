import React from "react";
import { userContext } from "./Componentes/userContext";
import { UsuarioRoute } from "./Componentes/UsuarioRoute";
import { Principal } from "./Vistas/Principal";
import { Login } from "./Vistas/Login";
import { SingUpBase } from "./Vistas/SingUpBase";
import { SingUpUsuarios } from "./Vistas/SingUpUsuarios";
import { SingUpEmprendedor } from "./Vistas/SingUpEmprendedor";
import { SingUpDriver } from "./Vistas/SingUpDriver";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Test from "./Vistas/Test";
import { NavBar } from "./Componentes/navBar.jsx";

function App() {
  let userData = null;
  return (
    <>
      <NavBar />
      <Router>
        <Switch>
          <Route exact path="/" component={Principal} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/SignUpBase" component={SingUpBase} />
          <Route exact path="/SignUpUsuarios" component={SingUpUsuarios} />
          <Route
            exact
            path="/SignUpEmprendedor"
            component={SingUpEmprendedor}
          />
          <Route exact path="/SignUpDriver" component={SingUpDriver} />
          <Route exact path="/test" component={Test} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
