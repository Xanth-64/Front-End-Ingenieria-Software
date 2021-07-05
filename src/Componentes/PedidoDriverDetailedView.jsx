import axios from "axios";
import { useEffect, useState } from "react";

import { FlexboxGrid, Loader } from "rsuite";
import { ListaPedidosDriver } from "./ListaPedidosDriver";
import { useCookies } from "react-cookie";

export const PedidoDriverDetailedView = (props) => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cookie] = useCookies(["user"]);

  const getInitialPedidos = () => {
    const innerFunc = async () => {
      try {
        setLoading(true);
        /*Esta función buscará los datos de los pedidos y las personas que generaron dichos pedidos,
      Para poder pasarlo al componente de la tabla */

        //Arreglo que se le pasará de parametro a la tabla
        let ArraydataPedidosPersonas = [];
        //Buscando los datos del driver

        //Buscanda todos los pedidos asignados al driver
        const initialData = await axios.get(
          `https://avviare.herokuapp.com/api/pedido/productos/driver/${props.driverData.id_transportista}`
        );

        //Buscando la data de cada usuario
        const doc2 = await axios.get(
          "https://avviare.herokuapp.com/api/usuarios/all"
        );
        const doc3 = await axios.get(
          "https://avviare.herokuapp.com/api/address/all"
        );
        const doc4 = await axios.get(
          "https://avviare.herokuapp.com/api/empre/all"
        );
        setPedidos(
          initialData.data.data[0].pedidos.map((elem) => {
            return {
              pedido: elem,
              cliente: {
                ...doc2.data.data.find((elem2) => {
                  return elem2.id_usuario === elem.usuarioIdUsuario;
                }),
                ...doc3.data.data.find((elem3) => {
                  return (elem3.usuarioIdUsuario = elem.usuarioIdUsuario);
                }),
              },
              driver: doc3.data.data.find((elem3) => {
                return elem3.usuarioIdUsuario === cookie.user.id;
              }),
              empre: doc3.data.data.find((elem3) => {
                return (
                  elem3.usuarioIdUsuario ===
                  doc4.data.data.find((elem2) => {
                    return (
                      elem2.id_negocio ===
                      elem.productos[0].emprendimientoIdNegocio
                    );
                  }).usuarioIdUsuario
                );
              }),
            };
          })
        );

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    innerFunc();
  };
  useEffect(getInitialPedidos, []);

  return (
    <>
      {!loading && <ListaPedidosDriver pedidosData={pedidos} />}
      {loading && <Loader />}
    </>
  );
};
