import React, { useState, useEffect, useRef } from "react";
import { Map } from "../Componentes/Map";
import { useHistory } from "react-router-dom";
import { FormSesion } from "../Componentes/FormSesion";
import { NavBar } from "../Componentes/navBar";
import { Alert, Loader } from "rsuite";

export const SignUpBase = ({ SubmitFunction, bFunction, onChange }) => {
  const history = useHistory();

  const labels = [
    {
      label: "tipo",
      inputs: [
        { label: "Usuario", value: "Usuario" },
        { label: "Emprendedor", value: "Emprendedor" },
        { label: "Driver", value: "Driver" },
      ],
      type: "radio",
    },
  ];

  return (
    <div>
      <FormSesion
        Inputlabels={labels}
        SubmitFunction={SubmitFunction}
        buttonText="Siguiente"
        showMap="D"
      />
    </div>
  );
};
