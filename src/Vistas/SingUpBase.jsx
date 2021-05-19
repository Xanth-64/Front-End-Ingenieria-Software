import React, { useState } from "react";
import { FormSesion } from "../Componentes/FormSesion";

export const SingUpBase = () => {
  const labels = [
    {
      label: "Tipo de Cliente",
      inputs: [{ label: "Usuario" }, { label: "Emprendimiento" }, { label: "Driver" }],
      type: "radio",
    },
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
      buttonText="Siguiente"
    />
  );
};
