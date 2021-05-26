import React from "react";
import { ComboCard } from "./ComboCard";
export const ComboSlider = ({ comboData: comboData, ...rest }) => {
  const comboD = [
    {
      image: "",
      nombre: "Combo",
      descripcion: "Muy bueno",
      precio: 10,
    },
    {
      image: "",
      nombre: "Combo",
      descripcion: "Muy bueno",
      precio: 10,
    },
    {
      image: "",
      nombre: "Combo",
      descripcion: "Muy bueno",
      precio: 10,
    },
  ];
  return (
    <div>
      {comboD.map((combo) => {
        return <ComboCard thing={combo} />;
      })}
    </div>
  );
};
