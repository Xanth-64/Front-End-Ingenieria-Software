import { FlexboxGrid } from "rsuite";
import { BuyView } from "../Componentes/BuyView";
export const ProductBuyView = (props) => {
  return (
    <>
      <FlexboxGrid
        justify="center"
        align="middle"
        style={{ marginTop: "2rem" }}
      >
        <FlexboxGrid justify="center" align="middle" style={{ width: "95%" }}>
          <BuyView
            userData={{
              address: { lat: 10.487267000000001, lng: -66.80741499999999 },
              id_usuario: 2,
            }}
            driverLocationArr={[
              {
                nombre: "Andres",
                value: 0,
                address: { lat: 10.487267000000001, lng: -66.90741499999999 },
                tarifa: 5,
                id_transportista: 1,
              },
              {
                nombre: "Pedro",
                value: 1,
                address: { lat: 10.487267000000001, lng: -66.70741499999999 },
                tarifa: 3,
                id_transportista: 2,
              },
            ]}
            productArr={[
              { product_id: 20, nombre: "Producto 1", price: 3.57 },
              { product_id: 22, nombre: "Producto 2", price: 2.4 },
              { product_id: 21, nombre: "Producto 3", price: 10 },
            ]}
          />
        </FlexboxGrid>
      </FlexboxGrid>
    </>
  );
};
