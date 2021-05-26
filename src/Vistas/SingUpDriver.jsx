import React, { useState } from "react";
import { FormSesion } from "../Componentes/FormSesion";
import { NavBar } from "../Componentes/NavBar";

export const SingUpDriver = () => {
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
      label: "Empresa Asociada",
      type: "text",
      limits: { required: true },
    },
    {
        label: "Tipo de Transporte",
        inputs: [{ label: "Automóvil grande" }, { label: "Automóvil pequeño" }, { label: "Motocicleta" }, { label: "Bicicleta" }],
        type: "radio",
        limits: { required: true },
    },

    // Acá falta carga de imágen + Ubicación

  ];
  function submit(data) {
    console.log("YEIII :D");
    console.log("Mary :3");
    console.log(data);
  }
  return (
    <div>
      <NavBar />
    <FormSesion
      Inputlabels={labels}
      SubmitFunction={submit}
      buttonText="Crear cuenta"
      title="Creación Driver"
      />
      </div>
  );
};
