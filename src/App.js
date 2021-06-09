import { React, useState, useEffect } from "react";
import { Principal } from "./Vistas/Principal";
import { Login } from "./Vistas/Login";
import { SingUpBase } from "./Vistas/SingUpBase";
import { SingUpUsuarios } from "./Vistas/SingUpUsuarios";
import { SingUpEmprendedor } from "./Vistas/SingUpEmprendedor";
import { SingUpDriver } from "./Vistas/SingUpDriver";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "rsuite/dist/styles/rsuite-default.css";
import Test from "./Vistas/Test";
import { NavBar } from "./Componentes/navBar";
// Mientras tanto
import { DatosEmprendimiento } from "./Vistas/DatosEmprendimiento";
import { SignUp } from "./Vistas/SignUp";

//Base App
function App() {
  return (
    <>
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
          <Route exact path="/SignUp" component={SignUp} />
          <Route
            exact
            path="/DatosEmprendimiento"
            component={DatosEmprendimiento}
          />
          <Route exact path="/test" component={Test} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
