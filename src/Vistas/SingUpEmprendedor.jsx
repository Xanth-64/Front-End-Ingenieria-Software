import React, { useState } from "react";
import { FormSesion } from "../Componentes/FormSesion";
export const SingUpEmprendedor = () => {
  const labels = [
    {
      type: "image",
    },
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

    // Acá falta carga de imágen + Ubicación
  ];
  function submit(data) {
    console.log(data);
  }
  return (
    <div>
      <FormSesion
        Inputlabels={labels}
        SubmitFunction={submit}
        buttonText="Siguiente"
        title="Creación Emprendedor"
        showMap="T"
      />
    </div>
  );
};
