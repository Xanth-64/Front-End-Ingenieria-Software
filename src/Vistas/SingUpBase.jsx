import React, { useState, useEffect, useRef } from "react";
import { Map } from "../Componentes/Map";
import { useHistory } from "react-router-dom";
import { FormSesion } from "../Componentes/FormSesion";
import { NavBar } from "../Componentes/navBar";
import { Alert, Loader } from "rsuite";

export const SingUpBase = ({ SubmitFunction, bFunction, onChange }) => {
  const history = useHistory();

  const labels = [
    {
      label: "Tipo de Cliente",
      inputs: [
        { label: "Usuario", value: "Usuario" },
        { label: "Emprendedor", value: "Emprendedor" },
        { label: "Driver", value: "Driver" },
      ],
      type: "radio",
    },
  ];
  function submit(data) {
    console.log(data);
    switch (data["Tipo de Cliente"]) {
      case "Usuario":
        history.push("/SignUpUsuarios");
        break;
      case "Emprendedor":
        history.push("/SignUpEmprendedor");
        break;
      case "Driver":
        history.push("/SignUpDriver");
        break;
      default:
        history.push("/SignUpUsuarios");
        break;
    }
  }
  return (
    <div>
      <FormSesion
        Inputlabels={labels}
        SubmitFunction={SubmitFunction}
        onChange={onChange}
        buttonText="Siguiente"
        showMap="D"
      />
    </div>
  );
};
