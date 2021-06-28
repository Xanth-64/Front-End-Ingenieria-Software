import {
  List,
  Panel,
  FlexboxGrid,
  Container,
  Header,
  Footer,
  Content,
} from "rsuite";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const PedidoList = (props) => {
  const [pedidoArr, setPedidoArr] = useState(props.pedidoArr);
  const handleSort = ({ oldIndex, newIndex }) => {
    const moveData = pedidoArr.splice(oldIndex, 1);
    const newData = [...pedidoArr];
    newData.splice(newIndex, 0, moveData[0]);
    setPedidoArr(newData);
  };
  return (
    <>
      <Panel
        bodyfill
        bordered
        style={{ padding: "5%", backgroundColor: "#F2F2F2" }}
      >
        <Container>
          <Header>
            <h2 style={{ textAlign: "center" }}>Pedidos</h2>
          </Header>
          <Content>
            <List bordered sortable hover onSort={handleSort}>
              {pedidoArr.map((elem, index) => {
                <List.Item
                  index={index}
                  key={uuidv4()}
                  style={{ marginTop: "1rem" }}
                ></List.Item>;
              })}
            </List>
          </Content>
          <Footer></Footer>
        </Container>
      </Panel>
    </>
  );
};
