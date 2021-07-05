import { useState, useEffect } from "react";
import {
  Panel,
  FlexboxGrid,
  Button,
  Col,
  Icon,
  List,
  IconButton,
  Pagination,
} from "rsuite";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { es } from "date-fns/locale";
export const ComprasUsuario = (props) => {
  const [activePage, setActivePage] = useState(1);

  const history = useHistory();
  const [pedidoArr, setPedidoArr] = useState(
    props.datosPedidos.length >= 5
      ? props.datosPedidos.slice(0, 4)
      : props.datosPedidos
  );
  const handleNav = () => {
    setPedidoArr(props.datosPedidos.slice(activePage * 5 - 5, activePage * 5));
  };
  const handleSort = ({ oldIndex, newIndex }) => {
    const moveData = pedidoArr.splice(oldIndex, 1);
    const newData = [...pedidoArr];
    newData.splice(newIndex, 0, moveData[0]);
    setPedidoArr(newData);
  };
  useEffect(handleNav, [activePage, props.datosPedidos]);

  return (
    <>
      <FlexboxGrid
        justify="center"
        align="middle"
        style={{ margin: "2rem 0", width: "95%" }}
      >
        <Panel bordered shaded style={{ width: "80%", padding: "3% 2%" }}>
          <FlexboxGrid>
            <FlexboxGrid.Item
              componentClass={Col}
              xs={24}
              sm={24}
              style={{ width: "100%" }}
            >
              <div
                className="cardContainer space-around wh-290vw"
                style={{ color: "#277276", width: "100%" }}
              >
                <h4 style={{ textAlign: "center" }}>Historial de Pedidos</h4>
              </div>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item
              componentClass={Col}
              xs={24}
              sm={24}
              style={{ width: "100%", marginTop: "2rem" }}
            >
              <FlexboxGrid justify="center" align="middle">
                <Panel
                  bordered
                  shaded
                  style={{
                    width: "95%",
                    padding: "3% 2%",
                    backgroundColor: "FFFFFF",
                  }}
                >
                  <Pagination
                    activePage={activePage}
                    boundaryLink
                    first
                    last
                    prev
                    next
                    maxButtons={5}
                    ellipsis
                    pages={Math.ceil(props.datosPedidos.length / 5)}
                    onSelect={(val) => {
                      setActivePage(val);
                    }}
                  />
                  <List sortable bordered onSort={handleSort}>
                    {pedidoArr.map((elem, index) => {
                      return (
                        <List.Item
                          index={index}
                          key={uuidv4()}
                          style={{ padding: "5%" }}
                        >
                          <FlexboxGrid justify="center" align="middle">
                            <Panel
                              bordered
                              shaded
                              style={{
                                width: "95%",
                                padding: "3% 2%",
                                backgroundColor: "88C7CA",
                              }}
                            >
                              <FlexboxGrid
                                align="middle"
                                justify="space-around"
                              >
                                <FlexboxGrid.Item
                                  componentClass={Col}
                                  xs={24}
                                  sm={16}
                                  style={{ marginTop: "1rem" }}
                                >
                                  <h6
                                    style={{
                                      textAlign: "center",
                                    }}
                                  >
                                    {format(
                                      new Date(elem.fecha),
                                      " | dd / MMMM / yyyy | -  hh:mm aa",
                                      {
                                        locale: es,
                                      }
                                    )}
                                  </h6>
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item
                                  componentClass={Col}
                                  xs={24}
                                  sm={6}
                                  style={{ marginTop: "1rem" }}
                                >
                                  <h5 style={{ textAlign: "center" }}>
                                    {`${elem.monto_total}$`}
                                  </h5>
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item
                                  componentClass={Col}
                                  xs={24}
                                  sm={2}
                                  style={{ marginTop: "1rem" }}
                                >
                                  <FlexboxGrid justify="center" align="middle">
                                    <IconButton
                                      onClick={() => {
                                        history.push(
                                          `/CompraDetail/${elem.qr}`
                                        );
                                      }}
                                      color="green"
                                      icon={<Icon icon="external-link" />}
                                    />
                                  </FlexboxGrid>
                                </FlexboxGrid.Item>
                              </FlexboxGrid>
                            </Panel>
                          </FlexboxGrid>
                        </List.Item>
                      );
                    })}
                  </List>
                </Panel>
              </FlexboxGrid>
            </FlexboxGrid.Item>
          </FlexboxGrid>

          <FlexboxGrid
            justify="center"
            align="bottom"
            style={{ marginTop: "3rem" }}
          >
            <Button
              size="lg"
              appearance="primary"
              color="#003234"
              onClick={() => {
                history.push(`/`);
              }}
            >
              <Icon icon="home" /> Volver a Home
            </Button>
          </FlexboxGrid>
        </Panel>
      </FlexboxGrid>
    </>
  );
};
