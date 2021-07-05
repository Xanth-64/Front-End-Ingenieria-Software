import { useState, useEffect } from "react";
import axios from "axios";
import { FlexboxGrid, Col, Alert, Loader } from "rsuite";
import { PedidoEmpreList } from "./PedidoEmpreList";
export const PedidoViewEmpre = (props) => {
  const [pedidoArr, setPedidoArr] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPedidoArr = () => {
    const innerFunc = async () => {
      try {
        setLoading(true);
        const doc1 = await axios.get(
          `https://avviare.herokuapp.com/api/pedido/productos/empre/${props.empreData.id_negocio}`
        );
        if (doc1.data.data.length) {
          setPedidoArr(doc1.data.data);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        Alert.error("Error recuperando su información");
        setLoading(false);
      }
    };
    innerFunc();
  };
  useEffect(getPedidoArr, []);
  return (
    <FlexboxGrid justify="center" align="middle" style={{ width: "100%" }}>
      <FlexboxGrid.Item
        componentClass={Col}
        xs={24}
        sm={24}
        style={{ marginTop: "1rem", width: "100%" }}
      >
        <FlexboxGrid justify="center" align="middle" style={{ width: "100%" }}>
          {loading ? (
            <Loader size="lg" speed="slow" />
          ) : (
            <PedidoEmpreList pedidoArr={pedidoArr} />
          )}
        </FlexboxGrid>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};
