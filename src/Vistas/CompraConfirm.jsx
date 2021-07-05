import { useState, useEffect } from "react";
import { FlexboxGrid, Panel, Icon, Loader, IconButton, Alert } from "rsuite";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

export const CompraConfirm = () => {
  const [loading, setLoading] = useState(true);
  let { qr } = useParams();
  const history = useHistory();
  const validateQr = () => {
    const innerFunc = async () => {
      try {
        const doc1 = await axios.put(
          "https://avviare.herokuapp.com/api/pedido/some",
          {
            where: { qr: qr },
            changes: { estado: "ENTREGADO" },
          }
        );
        if (doc1.data.data.length) {
          Alert.success("QR Validado Exitosamente");
        } else {
          Alert.error("Código QR Inválido");
          history.push("/");
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        Alert.error("Error al Validar el Código QR");
        history.push("/");
        setLoading(false);
      }
    };
    innerFunc();
  };
  useEffect(validateQr, []);
  return (
    <>
      {loading ? (
        <Loader center size="lg" speed="slow" />
      ) : (
        <FlexboxGrid justify="center" align="middle">
          <Panel
            bodyFill
            shaded
            bordered
            style={{
              padding: "5%",
              backgroundColor: "FFFFFF",
              marginTop: "4rem",
            }}
          >
            <FlexboxGrid justify="center" align="middle">
              <h2>Compra Confirmada </h2>
              <IconButton
                style={{ cursor: "pointer" }}
                color="green"
                appearance="primary"
                size="lg"
                icon={<Icon icon="check-circle" size="5x" />}
              />
            </FlexboxGrid>
          </Panel>
        </FlexboxGrid>
      )}
    </>
  );
};
