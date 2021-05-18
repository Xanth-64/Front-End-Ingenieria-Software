import React, { useState } from "react";
import { FormSesion } from "../Componentes/FormSesion";

export const Login = () => {
  const labels = [
    {
      label: "PrimerNombre",
      type: "text",
      required: true,
    },
    {
      label: "Apellido",
      type: "text",
      required: true,
    },
    ,
    {
      label: "constrasenia",
      type: "password",
      required: true,
    },
    {
      label: "confirmar contrasenia",
      type: "password",
      required: true,
    },
    {
      label: "descripcion",
      type: "text",
      required: true,
    },
  ];
  const submit = (data) => {
    console.log("YEIII :D");
    console.log(data);
  };
  return (
    <FormSesion
      Inputlabels={labels}
      SubmitFunction={submit}
      buttonText={"Enviar"}
    />
  );
};
