import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Panel } from "rsuite";
import { ListaPedidosDriver } from "../Componentes/ListaPedidosDriver";
export const PedidoDriverDetailedView = () => {
  const [cookie] = useCookies(["user"]);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const getInitialPedidos = async () => {
    /*Esta función buscará los datos de los pedidos y las personas que generaron dichos pedidos,
      Para poder pasarlo al componente de la tabla */

    //Arreglo que se le pasará de parametro a la tabla
    let ArraydataPedidosPersonas = [];
    //Buscando los datos del driver
    let driverData = await axios.get(
      "https://avviare.herokuapp.com/api/pedido/some",
      {
        usuarioIdUsuario: cookie.user.id,
      }
    );
    //Buscanda todos los pedidos asignados al driver
    let initialData = await axios.get(
      "https://avviare.herokuapp.com/api/pedido/some",
      {
        driveridTransportista: driverData.data.data[0],
      }
    );

    //Buscando la dara de cada usuario
    for (let index = 0; index < initialData.data.data.length; index++) {
      let pedidoID = initialData.data.data[index].usuarioIdUsuario;
      let url = "https://avviare.herokuapp.com/api/usuarios/one/" + params.id;
      let dataUsuario = await axios.get(url);
      ArraydataPedidosPersonas.push({
        pedido: initialData.data.data[index],
        cliente: "dataUsuario",
      });
    }
    setPedidos(ArraydataPedidosPersonas);

    setLoading(false);
  };
  useEffect(() => {
    getInitialPedidos();
  }, []);

  return (
    <>
      {!loading && (
        <Panel>
          <ListaPedidosDriver pedidosData={pedidos} />
        </Panel>
      )}
    </>
  );
};
