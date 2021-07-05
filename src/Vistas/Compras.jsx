import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { ComprasUsuario } from "../Componentes/ComprasUsuario";
import axios from "axios";
import { Alert, FlexboxGrid, Loader } from "rsuite";

export const Compras = () => {
  //Schemas
  const [cookie, setCookie] = useCookies(["user"]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const datosPedidos = () => {
    const innerFunc = async () => {
      try {
        const doc1 = await axios.post(
          "https://avviare.herokuapp.com/api/pedido/some",
          {
            usuarioIdUsuario: cookie.user.id,
          }
        );

        if (doc1) {
          setData(doc1.data.data);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        Alert.error("Error al Recuperar sus Pedidos.");
        setLoading(false);
      }
    };
    innerFunc();
  };

  useEffect(datosPedidos, []);
  return (
    <>
      {" "}
      <FlexboxGrid justify="center" align="middle">
        {loading ? (
          <Loader center size="lg" speed="slow" />
        ) : (
          <ComprasUsuario datosPedidos={data} />
        )}
      </FlexboxGrid>
    </>
  );
};
