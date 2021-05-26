import React from "react";

export const ComboCard = ({ thing: combo, ...rest }) => {
  console.log(combo);
  return (
    <div>
      <img src={combo.imagen} />
      <h3> {combo.nombre}</h3>
      <section> {combo.descripcion}</section>
      <div> Por solo {combo.precio} $ </div>
    </div>
  );
};
