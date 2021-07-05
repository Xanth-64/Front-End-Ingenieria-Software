import React from "react";
import { ComboSlider } from "../Componentes/ComboSlider";
export const Principal = () => {
  return (
    <div>
      <div>
        <div className="cardContainer-Title">
          <h1>Productos de la Semana</h1>
        </div>
        <div className="mainPage-element">
          <ComboSlider />
        </div>
      </div>
    </div>
  );
};
