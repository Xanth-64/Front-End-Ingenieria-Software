import React, { useState, Component } from "react";
import { Redirect, Route } from "react-router-dom";
export const UsuarioRoute = ({ component: Component, ...rest }) => {
  const [cargando, useCargando] = useState(true);
  const [sesion, useSesion] = useState(true);
  if (!cargando) {
    return (
      <Route
        {...rest}
        render={(props) => {
          return sesion ? <Component props /> : <Redirect to="/login" />;
        }}
      ></Route>
    );
  } else {
    return (
      <div className="cargando">
        <h1 className="cargando-texto"> Cargando...</h1>{" "}
        <img src="" alt="." className="cargando-icono" />
      </div>
    );
  }
};
