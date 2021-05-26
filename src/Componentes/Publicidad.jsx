export const Publicidad = (props) => {
  return (
    <div className="publicidad-card-container">
      <div className="cardContainer-Title">
        <h1>Ofertas de la Semana</h1>
      </div>
      <div className="publicidad-card-productContainer">
        {props.publicityProducts.map((element, index) => {
          return (
            <div
              className="publicidad-card-product"
              style={{ backgroundImage: "url(" + element.fotos[0] + ")" }}
              key={index}
            >
              <div className="publicidad-product-name">{element.nombre}</div>
              <div className="publicidad-product-price">{element.precio}$</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
