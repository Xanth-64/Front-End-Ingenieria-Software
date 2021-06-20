import React, { useState } from "react";
import { Alert } from "rsuite";
import { FormSesion } from "../Componentes/FormSesion";
import { NavBar } from "../Componentes/navBar";

export const SingUpUsuarios = ({ SubmitFunction, bFunction }) => {
  const labels = [
    {
      type: "image",
    },
    {
      label: "Nombre",
      type: "text",
      limits: { required: true },
    },
    {
      label: "Apellido",
      type: "text",
      limits: { required: true },
    },
    {
      label: "Número de Teléfono",
      type: "number",
      limits: { required: true },
    },
    {
      label: "Correo",
      type: "email",
      limits: { required: true },
    },
    {
      label: "Contraseña",
      type: "password",
      limits: { required: true },
    },
  ];
  function submit(data) {
    console.log(data);
  }
  return (
    <div>
      <FormSesion
        Inputlabels={labels}
        SubmitFunction={submit}
        buttonText="Crear Cuenta"
        title="Creación usuario Avviare"
        showMap="T"
        bFunction={bFunction}
      />
    </div>
  );
};
