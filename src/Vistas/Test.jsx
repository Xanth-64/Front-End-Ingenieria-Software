import React from "react";
import { Publicidad } from "../Componentes/Publicidad";

function Test() {
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
    <div className="form">
      <Publicidad publicityProducts={data}></Publicidad>
    </div>
  );
}

export default Test;
