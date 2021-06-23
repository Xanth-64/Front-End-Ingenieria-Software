import React, { useState } from "react";
import { FormSesion } from "../Componentes/FormSesion";
import { NavBar } from "../Componentes/navBar";

export const Login = () => {
  const labels = [
    {
      label: "Correo",
      type: "email",
      limits: { required: true },
    },
    {
      label: " ",
      type: " ",
      limits: { required: false }, 
    },
    {
      label: "Contraseña",
      type: "password",
      limits: { required: true },
    },
  ];
  function submit(data) {
    console.log("Pruebita Mb");
    console.log(data);
  }
  return (
    <div>
      <NavBar />
      <FormSesion
        Inputlabels={labels}
        SubmitFunction={submit}
        buttonText="Iniciar Sesión"
        title="Login"
      />
    </div>
  );
};
