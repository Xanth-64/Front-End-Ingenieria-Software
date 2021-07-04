import { PedidoDetailShower } from "../Componentes/PedidoDetailShower";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Alert, Loader, FlexboxGrid } from "rsuite";

export const CompraDetail = () => {
  let { qr } = useParams();
  const [pedidoData, setPedidoData] = useState({});
  const [productoArr, setProductoArr] = useState({});
  const [loading, setLoading] = useState(true);
  const getData = () => {
    const innerFunc = async () => {
      setLoading(true);
      try {
        const doc1 = await axios.post(
          "https://avviare.herokuapp.com/api/pedido/some",
          {
            qr: qr,
          }
        );
        console.log(doc1);
        if (doc1.data.data.length !== 0) {
          setPedidoData(doc1.data.data[0]);
          const doc2 = await axios.get(
            `https://avviare.herokuapp.com/api/pedido/productos/pedido/${doc1.data.data[0].id_pedido}`
          );
          setProductoArr(doc2.data.data[0].productos);
          setLoading(false);
        } else {
          Alert.error("Error cargando el Pedido Solicitado");
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    innerFunc();
  };
  useEffect(getData, []);
  return (
    <>
      {!loading && (
        <PedidoDetailShower pedidoData={pedidoData} productoArr={productoArr} />
      )}
      {loading && (
        <FlexboxGrid justify="center" align="middle">
          <Loader speed="slow" />
        </FlexboxGrid>
      )}
    </>
  );
};
