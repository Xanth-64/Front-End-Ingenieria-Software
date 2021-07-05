import { Image, Transformation } from "cloudinary-react";
import { Placeholder } from "rsuite";
import { Link } from "react-router-dom";

export const ComboCard = ({ thing: producto, ...rest }) => {
  return (
    <div className="card">
      <div className="cardElement card-Title">
        <h3> {producto.nombre}</h3>
      </div>
      <Link to={`/Product/${producto.id_producto}`}>
        {producto.fotos.length === 0 ? (
          <Placeholder.Graph width="250px" />
        ) : (
          <Image publicId={producto.fotos[0]}>
            <Transformation width="250" crop="fill" fetchFormat="auto" />
          </Image>
        )}
      </Link>

      <div className="cardElement">
        <p> {producto.descripcion}</p>
      </div>
      <div className="cardElement">
        <span>Por tan solo {producto.precio} $</span>
      </div>
    </div>
  );
};
