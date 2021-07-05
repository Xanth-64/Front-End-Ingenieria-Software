import { Nav, Container, Header, Content, FlexboxGrid, Icon } from "rsuite";
import { EmprendimientoProfileModifier } from "../Componentes/EmprendimientoProfileModifier";
import { ManageProducts } from "../Componentes/ManageProducts";
import { useState } from "react";
import { PedidoViewEmpre } from "./PedidoViewEmpre";

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
            <Nav.Item eventKey="profile" icon={<Icon icon="user" />}>
              Perfil
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
            {navSelect === "productList" && (
              <>
                <ManageProducts empreData={props.empreData} />
              </>
            )}
            {navSelect === "profile" && (
              <>
                <EmprendimientoProfileModifier empreData={props.empreData} />
              </>
            )}
            {navSelect === "pedidos" && (
              <>
                <PedidoViewEmpre empreData={props.empreData} />
              </>
            )}
            {navSelect === "graficos" && <></>}
          </FlexboxGrid>
        </Content>
      </Container>
    </>
  );
};
