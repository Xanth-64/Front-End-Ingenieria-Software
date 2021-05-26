import React from "react";
import { ComboCard } from "./ComboCard";
import combo1 from "../Assets/combo1.jpg";
import combo2 from "../Assets/combo2.jpg";
import combo3 from "../Assets/combo3.jpg";

export const ComboSlider = ({ comboData: comboData, ...rest }) => {
  const comboD = [
    {
      imagen: combo1,
      nombre: "Combo",
      descripcion: "Muy bueno",
      precio: 10,
    },
    {
      imagen: combo2,
      nombre: "Combo",
      descripcion: "Muy bueno",
      precio: 10,
    },
    {
      imagen: combo3,
      nombre: "Combo",
      descripcion: "Muy bueno",
      precio: 10,
    },
  ];
  return (
    <div className="cardContainer space-around">
      {comboD.map((combo) => {
        return <ComboCard thing={combo} />;
      })}
    </div>
  );
};
