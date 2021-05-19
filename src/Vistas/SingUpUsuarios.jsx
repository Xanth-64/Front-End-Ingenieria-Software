import React, { useState } from "react";
import { FormSesion } from "../Componentes/FormSesion";

export const SingUpUsuarios = () => {
  const labels = [
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
    {
      label: "Confirmar Contraseña",
      type: "password",
      limits: { required: true },
    },
    {
      label: "Genero",
      inputs: [{ label: "Masculino" }, { label: "Femenino" }],
      type: "radio",
    },

    // Acá falta Ubicación (Mapita)

  ];
  function submit(data) {
    console.log("YEIII :D");
    console.log("Mary :3");
    console.log(data);
  }
  return (
    <FormSesion
      Inputlabels={labels}
      SubmitFunction={submit}
      buttonText="Crear cuenta"
      title="Creación usuario avviare"
    />
  );
};
