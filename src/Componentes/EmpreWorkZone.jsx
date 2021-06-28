import { Nav, Container, Header, Content, FlexboxGrid, Icon } from "rsuite";

import { useState } from "react";

export const EmpreWorkZone = (props) => {
  const [navSelect, setNavSelect] = useState("productList");
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
            <Nav.Item eventKey="productList" icon={<Icon icon="cogs" />}>
              Productos
            </Nav.Item>
            <Nav.Item eventKey="suscription" icon={<Icon icon="diamond" />}>
              Suscripción
            </Nav.Item>
            <Nav.Item eventKey="pedidos" icon={<Icon icon="order-form" />}>
              Pedidos
            </Nav.Item>
            <Nav.Item eventKey="graficos" icon={<Icon icon="charts" />}>
              Estadística
            </Nav.Item>
          </Nav>
        </Header>
        <Content>
          <FlexboxGrid justify="center" align="middle">
            {navSelect === "productList" && <></>}
            {navSelect === "suscription" && <></>}
            {navSelect === "pedidos" && <></>}
            {navSelect === "graficos" && <></>}
          </FlexboxGrid>
        </Content>
      </Container>
    </>
  );
};
