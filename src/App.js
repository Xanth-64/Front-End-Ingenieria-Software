import { React } from "react";
import { Principal } from "./Vistas/Principal";
import { Login } from "./Vistas/Login";
import { ProductoDetailedView } from "./Vistas/ProductoDetailedView";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavBar } from "./Componentes/navBar";
import { ProtectedRoute } from "./Componentes/ProtectedRoute";
import "rsuite/dist/styles/rsuite-default.css";
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
import { AdministrativeWorkspace } from "./Vistas/AdministrativeWorkspace";
import { EmpreWorkspace } from "./Vistas/EmpreWorkspace";
import { DriverWorkspace } from "./Vistas/DriverWorkspace";
import { PerfilPropio } from "./Vistas/PerfilPropio";
import { Compras } from "./Vistas/Compras";
import { CompraDetail } from "./Vistas/CompraDetail";
import { CompraConfirm } from "./Vistas/CompraConfirm";

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
              <ProtectedRoute
                exact
                path="/Manage/Emprendimiento"
                component={EmpreWorkspace}
                AcceptOnly="Emprendedor"
              />
              <ProtectedRoute
                exact
                path="/Manage/Driver"
                component={DriverWorkspace}
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
                path="/Compras/All"
                component={Compras}
                AcceptOnly="SignedIn"
              />
              <ProtectedRoute
                exact
                path="/CompraDetail/:qr"
                component={CompraDetail}
                AcceptOnly="SignedIn"
              />
              <ProtectedRoute
                exact
                path="/Compra/Confirm/:qr"
                component={CompraConfirm}
                AcceptOnly="Transportista"
              />
            </Switch>
          </Router>
        </CloudinaryContext>
      </CookiesProvider>
    </>
  );
}

export default App;
