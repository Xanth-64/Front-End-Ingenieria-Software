import React from "react";
import { UsuarioRoute } from "./Componentes/UsuarioRoute";
import { Principal } from "./Vistas/Principal";
import { Login } from "./Vistas/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Test from "./Vistas/Test";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Principal} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/test" component={Test} />
      </Switch>
    </Router>
  );
}

export default App;
