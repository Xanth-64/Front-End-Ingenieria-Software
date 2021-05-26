import React from "react";

export const ComboCard = ({ thing: combo, ...rest }) => {
  console.log(combo);
  return (
    <div className="cardContainer">
      <img src={combo.imagen} className="combo-image" />
      <h3> {combo.nombre}</h3>
      <section> {combo.descripcion}</section>
      <div> Por solo {combo.precio} $ </div>
    </div>
  );
};
