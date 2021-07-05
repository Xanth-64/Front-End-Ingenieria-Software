import {
  List,
  Panel,
  FlexboxGrid,
  Container,
  Header,
  Footer,
  Content,
  Col,
  Icon,
  IconButton,
  Modal,
} from "rsuite";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ProductListShower } from "./ProductListShower";
export const PedidoEmpreList = (props) => {
  const [pedidoArr, setPedidoArr] = useState(props.pedidoArr);
  const [showModal, setShowModal] = useState(false);
  const [modalPedido, setModalPedido] = useState(null);
  const handleSort = ({ oldIndex, newIndex }) => {
    const moveData = pedidoArr.splice(oldIndex, 1);
    const newData = [...pedidoArr];
    newData.splice(newIndex, 0, moveData[0]);
    setPedidoArr(newData);
  };

  const showProductList = (elem) => {
    setModalPedido(elem);
    setShowModal(true);
  };
  return (
    <>
      <Panel
        bodyfill
        bordered
        shaded
        style={{ padding: "5%", backgroundColor: "#F2F2F2", width: "90%" }}
      >
        <Container>
          <Header>
            <h2 style={{ textAlign: "center" }}>Mis Pedidos</h2>
          </Header>
          <Content style={{ marginTop: "1.5rem" }}>
            <List bordered sortable hover onSort={handleSort}>
              {pedidoArr.map((elem, index) => {
                return (
                  <List.Item
                    index={index}
                    key={uuidv4()}
                    style={{ marginTop: "1rem" }}
                  >
                    <Panel bodyfill bordered shaded>
                      <FlexboxGrid justify="space-around" align="middle">
                        <FlexboxGrid.Item
                          componentClass={Col}
                          xs={24}
                          sm={16}
                          style={{ marginTop: "1.5rem" }}
                        >
                          <FlexboxGrid justify="center" align="middle">
                            <h6>
                              {format(
                                new Date(elem.fecha),
                                " | dd / MMMM / yyyy | -  hh:mm aa",
                                {
                                  locale: es,
                                }
                              )}
                            </h6>
                          </FlexboxGrid>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item
                          componentClass={Col}
                          xs={24}
                          sm={6}
                          style={{ marginTop: "1.5rem" }}
                        >
                          <FlexboxGrid justify="center" align="middle">
                            <h5>{`${elem.monto_total}$`}</h5>
                          </FlexboxGrid>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item
                          componentClass={Col}
                          xs={24}
                          sm={2}
                          style={{ marginTop: "1.5rem" }}
                        >
                          <FlexboxGrid justify="center" align="middle">
                            <IconButton
                              color="cyan"
                              icon={<Icon icon="list-alt" />}
                              onClick={() => {
                                showProductList(elem);
                              }}
                            />
                          </FlexboxGrid>
                        </FlexboxGrid.Item>
                      </FlexboxGrid>
                    </Panel>
                  </List.Item>
                );
              })}
            </List>
          </Content>
          <Footer></Footer>
        </Container>
        <Modal
          full
          show={showModal}
          onHide={() => {
            setShowModal(false);
            setModalPedido(null);
          }}
          style={{ width: "100vw", height: "100vh" }}
        >
          <Modal.Header>
            <Modal.Title>Productos de la Compra</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FlexboxGrid justify="center" align="middle">
              {modalPedido && (
                <ProductListShower productArr={modalPedido.productos} />
              )}
            </FlexboxGrid>
          </Modal.Body>
        </Modal>
      </Panel>
    </>
  );
};
