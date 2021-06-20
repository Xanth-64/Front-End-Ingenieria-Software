import React, { useState } from "react";
import { Alert } from "rsuite";
import { FormSesion } from "../Componentes/FormSesion";
import { NavBar } from "../Componentes/navBar";

export const SingUpDriver = ({ SubmitFunction, bFunction }) => {
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
      label: "Capacidad del Transporte",
      inputs: [
        { label: "Ligero" },
        { label: "Mediano" },
        { label: "Pesado" },
        { label: "Muy Pesado" },
      ],
      type: "radio",
      limits: { required: true },
    },

    // Acá falta carga de imágen + Ubicación
  ];
  function submit(data) {
    console.log(data);
  }
  return (
    <div>
      <FormSesion
        Inputlabels={labels}
        SubmitFunction={SubmitFunction}
        onChange={SubmitFunction}
        buttonText="Siguiente"
        title="Creación Driver"
        showMap="T"
        bFunction={bFunction}
      />
    </div>
  );
};
