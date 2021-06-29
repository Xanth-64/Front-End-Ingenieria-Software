import { format } from "date-fns";
import { es } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import { Panel, PanelGroup, Pagination } from "rsuite";

export const ListaPedidosDriver = ({ pedidosData, driver, ...rest }) => {
  const descripcion = "";
  return (
    <div>
      <PanelGroup accordion bordered>
        {pedidosData.map((pedido) => {
          return (
            <Panel
              header={
                // Formato del header, por algún motivo no se puede utilizar el ````${ }```
                pedido.cliente.nombre +
                " " +
                pedido.cliente.apellido +
                " " +
                format(new Date(), " | dd / MMMM / yyyy | -  hh:mm aa", {
                  locale: es,
                })
              }
            >
              <div>{pedido.pedido.estado} </div>
              <div> Total a Cobrar: {pedido.pedido.monto_total} $</div>
              <div>{descripcion}</div>
            </Panel>
          );
        })}
      </PanelGroup>
    </div>
  );
};
