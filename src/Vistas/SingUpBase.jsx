import React, { useState } from "react";
import { useHistory } from "react-router";
import { FormSesion } from "../Componentes/FormSesion";
import { NavBar } from "../Componentes/navBar";

export const SingUpBase = () => {
  const history = useHistory();
  const labels = [
    {
      label: "Tipo de Cliente",
      inputs: [
        { label: "Usuario" },
        { label: "Emprendimiento" },
        { label: "Driver" },
      ],
      type: "radio",
    },
  ];
  function submit(data) {
    console.log("YEIII :D");
    console.log("Mary :3");
    console.log(data);
    switch (data["Tipo de Cliente"]) {
      case "Usuario":
        history.push("/SignUpUsuarios");
        break;
      case "Emprendimiento":
        history.push("/SignUpEmprendedor");
        break;
      case "Driver":
        history.push("/SignUpDriver");
        break;
      default:
        history.push("/SignUpUsuario");
        break;
    }
  }
  return (
    <div>
      <NavBar />
      <FormSesion
        Inputlabels={labels}
        SubmitFunction={submit}
        buttonText="Siguiente"
      />
    </div>
  );
};
