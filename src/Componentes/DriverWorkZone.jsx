import {
  Container,
  Nav,
  Content,
  Header,
  Footer,
  FlexboxGrid,
  Icon,
} from "rsuite";
import { useState } from "react";

export const DriverWorkZone = (props) => {
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
            <Nav.Item eventKey="perfil" icon={<Icon icon="user" />}>
              Perfil
            </Nav.Item>
            <Nav.Item eventKey="graficos" icon={<Icon icon="charts" />}>
              Estadística
            </Nav.Item>
          </Nav>
        </Header>
        <Content>
          <FlexboxGrid justify="center" align="middle">
            {navSelect === "pedidos" && <></>}
            {navSelect === "perfil" && <></>}
            {navSelect === "graficos" && <></>}
          </FlexboxGrid>
        </Content>
      </Container>
    </>
  );
};
