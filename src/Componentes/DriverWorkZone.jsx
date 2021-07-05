import {
  Container,
  Nav,
  Content,
  Header,
  FlexboxGrid,
  Icon,
  Loader,
  Alert,
} from "rsuite";
import { useState, useEffect } from "react";
import { PedidoDriverDetailedView } from "../Componentes/PedidoDriverDetailedView";
import axios from "axios";
import { useCookies } from "react-cookie";
export const DriverWorkZone = (props) => {
  const [cookie] = useCookies(["user"]);
  const [driverData, setDriverData] = useState({});
  const [loading, setLoading] = useState(true);
  const getDriverData = () => {
    const innerFunc = async () => {
      try {
        setLoading(true);
        const doc1 = await axios.post(
          "https://avviare.herokuapp.com/api/drivers/some",
          {
            usuarioIdUsuario: cookie.user.id,
          }
        );

        if (doc1.data.data.length !== 0) {
          setDriverData(doc1.data.data[0]);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        Alert.error("Error obteniendo sus Datos");
        setLoading(false);
      }
    };
    innerFunc();
  };
  useEffect(getDriverData, []);
  const [navSelect, setNavSelect] = useState("pedidos");
  return (
    <>
      <Container>
        <Header>
          <Nav
            appearance="subtle"
            activeKey={navSelect}
            onSelect={(activeKey) => {
              setNavSelect(activeKey);
            }}
          >
            <Nav.Item eventKey="pedidos" icon={<Icon icon="order-form" />}>
              Pedidos
            </Nav.Item>
            {/* <Nav.Item eventKey="perfil" icon={<Icon icon="user" />}>
              Perfil
            </Nav.Item>
            <Nav.Item eventKey="graficos" icon={<Icon icon="charts" />}>
              Estadística
            </Nav.Item> */}
          </Nav>
        </Header>
        <Content>
          {loading ? (
            <Loader speed="slow" center />
          ) : (
            <FlexboxGrid
              justify="center"
              align="middle"
              style={{ width: "100%" }}
            >
              {navSelect === "pedidos" && (
                <PedidoDriverDetailedView driverData={driverData} />
              )}
              {/* {navSelect === "perfil" && <></>}
              {navSelect === "graficos" && <></>} */}
            </FlexboxGrid>
          )}
        </Content>
      </Container>
    </>
  );
};
