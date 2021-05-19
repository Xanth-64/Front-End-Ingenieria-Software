import React, { useState } from "react";
import { FormSesion } from "../Componentes/FormSesion";

export const SingUpEmprendedor = () => {
  const labels = [
    {
      label: "Nombre dueño",
      type: "text",
      limits: { required: true },
    },
    {
      label: "Apellido dueño",
      type: "text",
      limits: { required: true },
    },
    {
        label: "Correo",
        type: "email",
        limits: { required: true },
    },
    {
      label: "Número de Teléfono",
      type: "number",
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
      label: "Descripción del Negocio",
      type: "text",
      limits: { required: true },
    },
    {
        label: "Usuario en RRSS del emprendimiento",
        type: "text",
        limits: { required: false },
    },

    // Acá falta carga de imágen + Ubicación

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
      title="Creación emprendimiento avviare"
    />
  );
};
