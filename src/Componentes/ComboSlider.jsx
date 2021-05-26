import React from "react";
import { ComboCard } from "./ComboCard";
import { v4 as uuidv4 } from "uuid";

export const ComboSlider = ({ comboData: comboData, ...rest }) => {
  const comboD = [
    {
      imagen: "http://placecorgi.com/1000/1000",
      nombre: "Combo",
      descripcion: "Muy bueno",
      precio: 10,
    },
    {
      imagen: "http://placecorgi.com/1000/1000",
      nombre: "Combo",
      descripcion: "Muy bueno",
      precio: 10,
    },
    {
      imagen: "http://placecorgi.com/1000/1000",
      nombre: "Combo",
      descripcion: "Muy bueno",
      precio: 10,
    },
  ];
  return (
    <div className="cardContainer space-around wh-70vw">
      {comboD.map((combo) => {
        return <ComboCard thing={combo} key={uuidv4()} />;
      })}
    </div>
  );
};
