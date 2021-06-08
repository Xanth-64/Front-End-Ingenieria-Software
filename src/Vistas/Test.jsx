import React from "react";

import { AdminWorkZone } from "../Componentes/AdminWorkzone";
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
    <>
      <AdminWorkZone></AdminWorkZone>
    </>
  );
}

export default Test;
