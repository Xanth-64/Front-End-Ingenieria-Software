import { React } from "react";
import { Principal } from "./Vistas/Principal";
import { Login } from "./Vistas/Login";
import { ProductoDetailedView } from "./Vistas/ProductoDetailedView";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CloudinaryContext } from "cloudinary-react";
import { NavBar } from "./Componentes/navBar";
import "rsuite/dist/styles/rsuite-default.css";
import Test from "./Vistas/Test";
// Mientras tanto
import { DatosEmprendimiento } from "./Vistas/DatosEmprendimiento";
import { SignUp } from "./Vistas/SignUp";
import { Empre_Driver_Detailed } from "./Vistas/Empre_Driver_Detailed";
import { EmprendedorDetailedView } from "./Vistas/EmprendedorDetailedView";
import { CatalogView } from "./Vistas/CatalogView";

//Base App
function App() {
  return (
    <>
      <CloudinaryContext cloudName="unimet">
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Principal} />
            <Route exact path="/login" component={Login} />

            <Route exact path="/SignUp" component={SignUp} />
            <Route exact path="/Product/:id" component={ProductoDetailedView} />
            <Route
              exact
              path="/DatosEmprendimiento"
              component={DatosEmprendimiento}
            />
            <Route
              exact
              path="/Emprendimientos/:id"
              component={EmprendedorDetailedView}
            />
            <Route
              exact
              path="/Drivers/:id"
              component={Empre_Driver_Detailed}
            />
            <Route path="/Catalog" component={CatalogView} />
            <Route exact path="/test" component={Test} />
          </Switch>
        </Router>
      </CloudinaryContext>
    </>
  );
}

export default App;
