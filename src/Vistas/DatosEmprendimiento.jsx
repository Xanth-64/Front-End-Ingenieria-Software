import React from "react";
import { FormSesion } from "../Componentes/FormSesion";
import { NavBar } from "../Componentes/navBar";

export const DatosEmprendimiento = () => {
  const labels = [
    // Acá falta carga de imágen
    {
      label: "Cargar logo emprendimiento",
      type: "text",
      limits: { required: true },
    },
    {
      label: "Nombre Emprendimiento",
      type: "text",
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
  ];
  function submit(data) {
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
        title="Creación Emprendimiento en Avviare"
      />
    </div>
  );
};
