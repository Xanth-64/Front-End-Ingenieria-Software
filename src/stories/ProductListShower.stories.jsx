import React from "react";
import "rsuite/dist/styles/rsuite-default.css";
import { BrowserRouter as Router } from "react-router-dom";

import { ProductListShower } from "../Componentes/ProductListShower";

export default {
  component: ProductListShower,
  title: "Components/ProductListShower",
};

const Story = (args) => (
  <Router>
    <ProductListShower {...args} />
  </Router>
);

export const Dataless = Story.bind({});

Dataless.args = { productArr: [] };
export const Datafull = Story.bind({});

Datafull.args = {
  productArr: [
    { id_producto: 1, nombre: "Producto Prueba", precio: 5, fotos: [] },
    { id_producto: 1, nombre: "Producto Prueba", precio: 5, fotos: [] },
    { id_producto: 1, nombre: "Producto Prueba", precio: 5, fotos: [] },
    { id_producto: 1, nombre: "Producto Prueba", precio: 5, fotos: [] },
    { id_producto: 1, nombre: "Producto Prueba", precio: 5, fotos: [] },
    { id_producto: 1, nombre: "Producto Prueba", precio: 5, fotos: [] },
    { id_producto: 1, nombre: "Producto Prueba", precio: 5, fotos: [] },
    { id_producto: 1, nombre: "Producto Prueba", precio: 5, fotos: [] },
    { id_producto: 1, nombre: "Producto Prueba", precio: 5, fotos: [] },
    { id_producto: 1, nombre: "Producto Prueba", precio: 5, fotos: [] },
  ],
};
