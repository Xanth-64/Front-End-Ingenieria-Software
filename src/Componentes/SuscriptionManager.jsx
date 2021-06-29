import {
  Grid,
  Col,
  Row,
  Panel,
  FlexboxGrid,
  Button,
  Icon,
  Alert,
} from "rsuite";
import { useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";

export const SuscriptionManager = (props) => {
  const [driverData, setDriverData] = useState(props.driverData);
  const [loading, setLoading] = useState(false);

  //Funciones para el Manejo de Pagos
  const manageStripe = async (amount) => {};
  const handlePaypal = async (amount) => {};
  return (
    <>
      <Grid>
        <Row>
          <Col md={24} colspan={8}>
            {/* Pago del Paquete Pichón */}
            <Panel
              shaded
              bordered
              bodyfill
              style={{
                width: "90%",
                backgroundColor: "#FFFFFF",
                height: "100%",
                padding: "5% 0",
              }}
            >
              <FlexboxGrid justify="center" align="middle">
                <FlexboxGrid.Item componentClass={Col} colspan={24}>
                  <h3 style={{ textAlign: "center" }}>Paquete Pichón</h3>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item componentClass={Col} colspan={24}>
                  <h4 style={{ textAlign: "center" }}>10$</h4>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item componentClass={Col} colspan={24}>
                  <h4 style={{ textAlign: "center" }}>
                    1 Mes de Avviare Premium
                  </h4>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item componentClass={Col} colspan={24}>
                  <FlexboxGrid
                    style={{ width: "100%" }}
                    justify="center"
                    align="middle"
                  >
                    <Button
                      color="violet"
                      apperance="primary"
                      disabled={loading}
                      onClick={async () => {
                        await manageStripe(10);
                      }}
                      style={{ width: "50%" }}
                      role="link"
                    >
                      <Icon icon="cc-stripe" /> Stripe
                    </Button>
                  </FlexboxGrid>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item componentClass={Col} colspan={24}>
                  <FlexboxGrid
                    style={{ width: "100%" }}
                    justify="center"
                    align="middle"
                  >
                    <div style={{ width: "50%" }}>
                      {!loading && (
                        <PayPalButton
                          onApprove={async () => {
                            await handlePaypal(10);
                          }}
                          onError={() => {
                            Alert.error("Pago Fallido");
                          }}
                          onCancel={() => {
                            Alert.error("Error, Pago Cancelado.");
                          }}
                          amount={10}
                          style={{
                            color: "gold",
                            size: "responsive",
                          }}
                          options={{
                            currency: "USD",
                            intent: "capture",
                            clientId:
                              "ASbGKm1OT7BXW5xehWQruse5UE9C55AkNCo5Kv5vHqjTATXmPZ4dRhY2c-irCzoWcBjkqmlhoQOiMTEX",
                            "disable-funding": "card",
                          }}
                        />
                      )}
                    </div>
                    {loading && (
                      <Button
                        color="yellow"
                        apperance="primary"
                        disabled
                        style={{ width: "50%" }}
                        role="link"
                      >
                        <Icon icon="paypal" /> Paypal
                      </Button>
                    )}
                  </FlexboxGrid>
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </Panel>
          </Col>
          <Col md={24} colspan={8}>
            {/* Pago del Paquete Lechuza */}
            <Panel
              shaded
              bordered
              bodyfill
              style={{
                width: "90%",
                backgroundColor: "#FFFFFF",
                height: "100%",
                padding: "5% 0",
              }}
            >
              <FlexboxGrid justify="center" align="middle">
                <FlexboxGrid.Item componentClass={Col} colspan={24}>
                  <h3 style={{ textAlign: "center" }}>Paquete Lechuza</h3>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item componentClass={Col} colspan={24}>
                  <h4 style={{ textAlign: "center" }}>60$</h4>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item componentClass={Col} colspan={24}>
                  <h4 style={{ textAlign: "center" }}>
                    7 Meses de Avviare Premium
                  </h4>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item componentClass={Col} colspan={24}>
                  <FlexboxGrid
                    style={{ width: "100%" }}
                    justify="center"
                    align="middle"
                  >
                    <Button
                      color="violet"
                      apperance="primary"
                      disabled={loading}
                      onClick={async () => {
                        await manageStripe(60);
                      }}
                      style={{ width: "50%" }}
                      role="link"
                    >
                      <Icon icon="cc-stripe" /> Stripe
                    </Button>
                  </FlexboxGrid>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item componentClass={Col} colspan={24}>
                  <FlexboxGrid
                    style={{ width: "100%" }}
                    justify="center"
                    align="middle"
                  >
                    <div style={{ width: "50%" }}>
                      {!loading && (
                        <PayPalButton
                          onApprove={async () => {
                            await handlePaypal(60);
                          }}
                          onError={() => {
                            Alert.error("Pago Fallido");
                          }}
                          onCancel={() => {
                            Alert.error("Error, Pago Cancelado.");
                          }}
                          amount={60}
                          style={{
                            color: "gold",
                            size: "responsive",
                          }}
                          options={{
                            currency: "USD",
                            intent: "capture",
                            clientId:
                              "ASbGKm1OT7BXW5xehWQruse5UE9C55AkNCo5Kv5vHqjTATXmPZ4dRhY2c-irCzoWcBjkqmlhoQOiMTEX",
                            "disable-funding": "card",
                          }}
                        />
                      )}
                    </div>
                    {loading && (
                      <Button
                        color="yellow"
                        apperance="primary"
                        disabled
                        style={{ width: "50%" }}
                        role="link"
                      >
                        <Icon icon="paypal" /> Paypal
                      </Button>
                    )}
                  </FlexboxGrid>
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </Panel>
          </Col>
          <Col md={24} colspan={8}>
            {/* Pago del Paquete Buho */}
            <Panel
              shaded
              bordered
              bodyfill
              style={{
                width: "90%",
                backgroundColor: "#FFFFFF",
                height: "100%",
                padding: "5% 0",
              }}
            >
              <FlexboxGrid justify="center" align="middle">
                <FlexboxGrid.Item componentClass={Col} colspan={24}>
                  <h3 style={{ textAlign: "center" }}>Paquete Buho</h3>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item componentClass={Col} colspan={24}>
                  <h4 style={{ textAlign: "center" }}>120$</h4>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item componentClass={Col} colspan={24}>
                  <h4 style={{ textAlign: "center" }}>
                    14 Meses de Avviare Premium
                  </h4>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item componentClass={Col} colspan={24}>
                  <FlexboxGrid
                    style={{ width: "100%" }}
                    justify="center"
                    align="middle"
                  >
                    <Button
                      color="violet"
                      apperance="primary"
                      disabled={loading}
                      onClick={async () => {
                        await manageStripe(120);
                      }}
                      style={{ width: "50%" }}
                      role="link"
                    >
                      <Icon icon="cc-stripe" /> Stripe
                    </Button>
                  </FlexboxGrid>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item componentClass={Col} colspan={24}>
                  <FlexboxGrid
                    style={{ width: "100%" }}
                    justify="center"
                    align="middle"
                  >
                    <div style={{ width: "50%" }}>
                      {!loading && (
                        <PayPalButton
                          onApprove={async () => {
                            await handlePaypal(120);
                          }}
                          onError={() => {
                            Alert.error("Pago Fallido");
                          }}
                          onCancel={() => {
                            Alert.error("Error, Pago Cancelado.");
                          }}
                          amount={10}
                          style={{
                            color: "gold",
                            size: "responsive",
                          }}
                          options={{
                            currency: "USD",
                            intent: "capture",
                            clientId:
                              "ASbGKm1OT7BXW5xehWQruse5UE9C55AkNCo5Kv5vHqjTATXmPZ4dRhY2c-irCzoWcBjkqmlhoQOiMTEX",
                            "disable-funding": "card",
                          }}
                        />
                      )}
                    </div>
                    {loading && (
                      <Button
                        color="yellow"
                        apperance="primary"
                        disabled
                        style={{ width: "50%" }}
                        role="link"
                      >
                        <Icon icon="paypal" /> Paypal
                      </Button>
                    )}
                  </FlexboxGrid>
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </>
  );
};
