import { React } from "react";
import { Principal } from "./Vistas/Principal";
import { Login } from "./Vistas/Login";
import { ProductoDetailedView } from "./Vistas/ProductoDetailedView";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavBar } from "./Componentes/navBar";
import { ProtectedRoute } from "./Componentes/ProtectedRoute";
import "rsuite/dist/styles/rsuite-default.css";
import Test from "./Vistas/Test";
//Context providers
import { CloudinaryContext } from "cloudinary-react";
import { CookiesProvider } from "react-cookie";
// Mientras tanto
import { DatosEmprendimiento } from "./Vistas/DatosEmprendimiento";
import { SignUp } from "./Vistas/SignUp";
import { Empre_Driver_Detailed } from "./Vistas/Empre_Driver_Detailed";
import { EmprendedorDetailedView } from "./Vistas/EmprendedorDetailedView";
import { CatalogView } from "./Vistas/CatalogView";
import { ProductBuyView } from "./Vistas/ProductBuyView";
import { Test2 } from "./Vistas/Test2";
import { Test3 } from "./Vistas/Test3";
import { PedidoDriverDetailedView } from "./Vistas/PedidoDriverDetailedView";
import { AdministrativeWorkspace } from "./Vistas/AdministrativeWorkspace";
import { EmpreWorkspace } from "./Vistas/EmpreWorkspace";
import { PerfilPropio } from "./Vistas/PerfilPropio";
import { Compras } from "./Vistas/Compras";

//Base App
function App() {
  return (
    <>
      <CookiesProvider>
        <CloudinaryContext cloudName="unimet">
          <Router>
            <NavBar />
            <Switch>
              <Route exact path="/" component={Principal} />
              <ProtectedRoute
                exact
                path="/login"
                component={Login}
                AcceptOnly="Unsigned"
              />

              <Route exact path="/SignUp" component={SignUp} />
              <Route
                exact
                path="/Product/:id"
                component={ProductoDetailedView}
              />
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
              <ProtectedRoute
                exact
                path="/Buy/Product/:id"
                component={ProductBuyView}
                AcceptOnly="SignedIn"
              />
              <ProtectedRoute
                exact
                path="/Manage/Administrator"
                component={AdministrativeWorkspace}
                AcceptOnly="SignedIn"
              />
              <Route exact path="/test2" component={Test2} />
              <Route exact path="/test3" component={Test3} />
              <ProtectedRoute
                exact
                path="/Manage/Emprendimiento"
                component={EmpreWorkspace}
                AcceptOnly="Emprendedor"
              />
              <ProtectedRoute
                exact
                path="/Drivers/:id/Pedidos"
                component={PedidoDriverDetailedView}
                AcceptOnly="Transportista"
              />
              <ProtectedRoute
                exact
                path="/PerfilPropio"
                component={PerfilPropio}
                AcceptOnly="SignedIn"
              />
              <ProtectedRoute
                exact
                path="/Compras"
                component={Compras}
                AcceptOnly="SignedIn"
              />
            </Switch>
          </Router>
        </CloudinaryContext>
      </CookiesProvider>
    </>
  );
}

export default App;
