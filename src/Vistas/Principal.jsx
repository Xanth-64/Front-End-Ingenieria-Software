import React from "react";
import { ComboSlider } from "../Componentes/ComboSlider";
import { Publicidad } from "../Componentes/Publicidad";
import { NavBar } from "../Componentes/navBar";
export const Principal = () => {
  const data = [
    {
      nombre: "Product A",
      precio: "15",
      fotos: [
        "http://placecorgi.com/1000/1000",
        "http://placecorgi.com/1000/1000",
      ],
    },
    {
      nombre: "Product B",
      precio: "20",
      fotos: [
        "http://placecorgi.com/1000/1000",
        "http://placecorgi.com/1000/1000",
      ],
    },
    {
      nombre: "Product C",
      precio: "20",
      fotos: [
        "http://placecorgi.com/1000/1000",
        "http://placecorgi.com/1000/1000",
      ],
    },
  ];
  return (
    <div>
      <div>
        <div className="cardContainer-Title">
          <h1>Combos de la Semana</h1>
        </div>
        <div className="mainPage-element">
          <ComboSlider />
        </div>
        <div className="mainPage-element">
          <Publicidad publicityProducts={data}></Publicidad>
        </div>
      </div>
    </div>
  );
};
