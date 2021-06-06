import React from "react";
import { Publicidad } from "../Componentes/Publicidad";
import { Button } from "rsuite";
import { Navbar } from "rsuite";
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
      <Button>Hello World</Button>
      <Publicidad publicityProducts={data}></Publicidad>
      <Navbar>
        <Navbar.Header>
          <p>Veamos que tal</p>
        </Navbar.Header>
      </Navbar>
    </div>
  );
}

export default Test;
