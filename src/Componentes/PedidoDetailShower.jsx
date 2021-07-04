import { FlexboxGrid, Panel, Col } from "rsuite";
import QRCode from "qrcode.react";
import { ProductListShower } from "./ProductListShower";
export const PedidoDetailShower = (props) => {
  return (
    <>
      <FlexboxGrid
        justify="center"
        align="middle"
        style={{ marginTop: "2.5rem" }}
      >
        <Panel
          shaded
          bordered
          bodyfill="true"
          style={{
            width: "95%",
            backgroundColor: "#FAFAFA",
            height: "100%",
            padding: "5% 0",
          }}
        >
          <FlexboxGrid justify="space-around" align="middle">
            <FlexboxGrid.Item
              componentClass={Col}
              xs={24}
              md={12}
              style={{ marginTop: "2.5rem" }}
            >
              <Panel
                shaded
                bordered
                bodyfill="true"
                style={{
                  width: "95%",
                  backgroundColor: "#FFFFFF",
                  height: "100%",
                  padding: "5% 0",
                }}
              >
                <FlexboxGrid>
                  <FlexboxGrid.Item
                    componentClass={Col}
                    xs={24}
                    sm={24}
                    style={{ marginTop: "1.5rem" }}
                  >
                    <h1 style={{ textAlign: "center" }}>Mi Pedido</h1>
                  </FlexboxGrid.Item>
                  <FlexboxGrid.Item
                    componentClass={Col}
                    xs={24}
                    sm={24}
                    style={{ marginTop: "1.5rem" }}
                  >
                    <h2
                      style={{ textAlign: "center" }}
                    >{`${props.pedidoData.monto_total}$`}</h2>
                  </FlexboxGrid.Item>
                  <FlexboxGrid.Item
                    componentClass={Col}
                    xs={24}
                    sm={24}
                    style={{ marginTop: "1.5rem" }}
                  >
                    <FlexboxGrid justify="center" align="middle">
                      <QRCode
                        value={
                          "http://localhost:4000/Compra/Confirm/" +
                          props.pedidoData.qr
                        }
                        size={250}
                      />
                    </FlexboxGrid>
                  </FlexboxGrid.Item>
                </FlexboxGrid>
              </Panel>
            </FlexboxGrid.Item>

            <FlexboxGrid.Item
              componentClass={Col}
              xs={24}
              md={12}
              style={{ marginTop: "2.5rem" }}
            >
              <Panel
                shaded
                bordered
                bodyfill="true"
                style={{
                  width: "95%",
                  backgroundColor: "#FFFFFF",
                  height: "100%",
                  padding: "5% 0",
                }}
              >
                <FlexboxGrid justify="center" align="middle">
                  <ProductListShower productArr={props.productoArr} />
                </FlexboxGrid>
              </Panel>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Panel>
      </FlexboxGrid>
    </>
  );
};
