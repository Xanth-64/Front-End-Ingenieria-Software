import React from "react";
import { Card } from "../Componentes/Card";
import { ComboSlider } from "../Componentes/ComboSlider";
import { FormSesion } from "../Componentes/FormSesion";

export const Principal = () => {
  return (
    <div>
      <h1> Top Combos de la Semana </h1>
      <div>
        <ComboSlider />
      </div>
    </div>
  );
};
