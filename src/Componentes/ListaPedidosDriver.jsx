import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useEffect, useState } from "react";
import { Panel, PanelGroup, Pagination, FlexboxGrid } from "rsuite";
import { v4 as uuidv4 } from "uuid";
import { MapRoute } from "./MapRoute";
import { ProductListShower } from "./ProductListShower";
import QrReader from "react-qr-scanner";
import { useHistory } from "react-router-dom";

export const ListaPedidosDriver = (props) => {
  const [pedidosArr, setPedidosArr] = useState(props.pedidosData);
  const history = useHistory();
  const descripcion = "";
  const handleScan = (data) => {
    if (data) {
      history.push(data.text);
    }
  };
  const handleError = (err) => {
    console.log(err);
  };
  return (
    <PanelGroup
      accordion
      bordered
      style={{ width: "100%", marginTop: "1.5rem" }}
    >
      {pedidosArr.map((pedido) => {
        return (
          <Panel
            key={uuidv4()}
            header={
              // Formato del header, por algún motivo no se puede utilizar el ````${ }```
              pedido.cliente.nombre +
              " " +
              pedido.cliente.apellido +
              " " +
              format(
                new Date(pedido.pedido.fecha),
                " | dd / MMMM / yyyy | -  hh:mm aa",
                {
                  locale: es,
                }
              )
            }
          >
            <FlexboxGrid justify="center" align="middle">
              <div>{pedido.pedido.estado} </div>
            </FlexboxGrid>
            <FlexboxGrid justify="center" align="middle">
              <div> Total a Cobrar: {pedido.pedido.monto_total} $</div>
            </FlexboxGrid>
            <FlexboxGrid justify="center" align="middle">
              <div>{descripcion}</div>
            </FlexboxGrid>
            <FlexboxGrid justify="center" align="middle">
              <div style={{ marginTop: "0.5 rem" }}>
                <MapRoute
                  driverPosition={{
                    lat: Number(pedido.driver.latitud),
                    lng: Number(pedido.driver.longitud),
                  }}
                  userPosition={{
                    lat: Number(pedido.cliente.latitud),
                    lng: Number(pedido.cliente.longitud),
                  }}
                  emprePosition={{
                    lat: Number(pedido.empre.latitud),
                    lng: Number(pedido.empre.longitud),
                  }}
                />
              </div>
            </FlexboxGrid>
            <FlexboxGrid
              justify="center"
              align="middle"
              style={{ marginTop: "2rem" }}
            >
              <ProductListShower productArr={pedido.pedido.productos} />
            </FlexboxGrid>
            <FlexboxGrid
              justify="center"
              align="middle"
              style={{ marginTop: "1rem" }}
            >
              <h4>Escanear Qr de Confirmación</h4>
            </FlexboxGrid>
            <FlexboxGrid
              justify="center"
              align="middle"
              style={{ marginTop: "1rem" }}
            >
              <QrReader
                delay={1000}
                style={{ width: "300px", height: "300px" }}
                onError={handleError}
                onScan={handleScan}
                facingMode="front"
              />
            </FlexboxGrid>
          </Panel>
        );
      })}
    </PanelGroup>
  );
};
