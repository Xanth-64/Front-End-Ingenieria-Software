import React from "react";
import { UsuarioRoute } from "./Componentes/UsuarioRoute";
import { Principal } from "./Vistas/Principal";
import { Login } from "./Vistas/Login";
import { SingUpBase } from "./Vistas/SingUpBase";
import { SingUpUsuarios } from "./Vistas/SingUpUsuarios";
import { SingUpEmprendedor } from "./Vistas/SingUpEmprendedor";
import { SingUpDriver } from "./Vistas/SingUpDriver";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Test from "./Vistas/Test";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Principal} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/SingUpBase" component={SingUpBase} />
        <Route exact path="/SingUpUsuarios" component={SingUpUsuarios} />
        <Route exact path="/SingUpEmprendedor" component={SingUpEmprendedor} />
        <Route exact path="/SingUpUsuarios" component={SingUpUsuarios} />
        <Route exact path="/SingUpDriver" component={SingUpDriver} />
        <Route exact path="/test" component={Test} />
      </Switch>
    </Router>
  );
}

export default App;
