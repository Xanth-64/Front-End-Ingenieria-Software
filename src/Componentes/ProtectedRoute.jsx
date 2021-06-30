import React, { useState, useEffect, Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Loader } from "rsuite";
export const ProtectedRoute = ({
  component: Component,
  AcceptOnly,
  ...rest
}) => {
  const [cookie] = useCookies(["user"]);
  const [cargando, setCargando] = useState(true);
  useEffect(() => {
    setCargando(false);
  }, []);
  let userInfo = cookie.user;
  if (!cargando) {
    console.log("userInfoo", userInfo);
    switch (AcceptOnly) {
      case "SignedIn":
        return (
          <Route
            {...rest}
            render={(props) => {
              return userInfo ? <Component props /> : <Redirect to="/login" />;
            }}
          ></Route>
        );
      case "Emprendedor":
        return (
          <Route
            {...rest}
            render={(props) => {
              if (userInfo) {
                return userInfo.tipo === "Emprendedor" ? (
                  <Component props />
                ) : (
                  <Redirect to="/" />
                );
              }
              return <Redirect to="/" />;
            }}
          ></Route>
        );
      case "Cliente":
        return (
          <Route
            {...rest}
            render={(props) => {
              if (userInfo) {
                return userInfo.tipo === "Cliente" ? (
                  <Component props />
                ) : (
                  <Redirect to="/" />
                );
              }
              return <Redirect to="/" />;
            }}
          ></Route>
        );
      case "Transportista":
        return (
          <Route
            {...rest}
            render={(props) => {
              if (userInfo) {
                return userInfo.tipo === "Transportista" ? (
                  <Component props />
                ) : (
                  <Redirect to="/" />
                );
              }
              return <Redirect to="/" />;
            }}
          ></Route>
        );
      case "Administrador":
        return (
          <Route
            {...rest}
            render={(props) => {
              if (userInfo) {
                return userInfo.tipo === "Administrador" ? (
                  <Component props />
                ) : (
                  <Redirect to="/" />
                );
              }
              return <Redirect to="/" />;
            }}
          ></Route>
        );
      case "SignedInNotCliente":
        return (
          <Route
            {...rest}
            render={(props) => {
              if (userInfo) {
                return userInfo.tipo === "Emprendedor" ||
                  userInfo.tipo === "Transportista" ? (
                  <Component props />
                ) : (
                  <Redirect to="/" />
                );
              }
              return <Redirect to="/" />;
            }}
          ></Route>
        );
      case "Unsigned":
        return (
          <Route
            {...rest}
            render={(props) => {
              return !userInfo ? <Component props /> : <Redirect to="/" />;
            }}
          ></Route>
        );
      default:
        return <Redirect to="/signup" />;
    }
  } else {
    return (
      <div className="cargando">
        <Loader> Cargando...</Loader>{" "}
      </div>
    );
  }
};
