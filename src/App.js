import React from "react";
import { userContext } from "./Componentes/userContext";
import { UsuarioRoute } from "./Componentes/UsuarioRoute";
import { Principal } from "./Vistas/Principal";
import { Login } from "./Vistas/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Test from "./Vistas/Test";

function App() {
  let userData = null;
  return (
    <Router>
      <userContext.Provider value={userData}>
        <Switch>
          <Route exact path="/" component={Principal} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/test" component={Test} />
        </Switch>
      </userContext.Provider>
    </Router>
  );
}

export default App;
