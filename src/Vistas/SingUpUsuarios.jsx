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
    Alert.success("Solicitud de Registro enviada");
  }
  return (
    <div>
      <FormSesion
        Inputlabels={labels}
        SubmitFunction={SubmitFunction}
        onChange={SubmitFunction}
        buttonText="Siguiente"
        title="Creación usuario avviare"
        showMap="T"
        bFunction={bFunction}
      />
    </div>
  );
};
