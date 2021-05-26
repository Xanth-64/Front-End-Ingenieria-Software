export const ComboCard = ({ thing: combo, ...rest }) => {
  console.log(combo);
  return (
    <div className="card">
      <div className="cardElement card-Title">
        <h3> {combo.nombre}</h3>
      </div>
      <div
        style={{ backgroundImage: "url(" + combo.imagen + ")" }}
        className="cardElement combo-image"
      ></div>
      <div className="cardElement">
        <p> {combo.descripcion}</p>
      </div>
      <div className="cardElement">
        <span>Por tan solo {combo.precio} $</span>
      </div>
    </div>
  );
};
