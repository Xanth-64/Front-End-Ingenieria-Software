import {
  Calendar,
  Col,
  Panel,
  FlexboxGrid,
  Button,
  Icon,
  Alert,
  Badge,
} from "rsuite";
import { useState, useEffect } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
export const SuscriptionManager = (props) => {
  const [loading, setLoading] = useState(false);
  const [sdkLoaded1, setSdkLoaded1] = useState(false);
  const [sdkLoaded2, setSdkLoaded2] = useState(false);
  const [suscriptionData, setSuscriptionData] = useState([]);
  const stripePromise = loadStripe(
    "pk_test_51IukCSDDymNJk4N6kW95BdQ1sKQ6RGeGtuz33wMDQ8WxPpYyfw0JGEyf0eyzZ7gz9xormuw9Au9mPZwN7IndR33F00x1kxNICY"
  );

  const getSuscriptionData = () => {
    const innerFunc = async () => {
      try {
        const doc1 = await axios.post(
          `https://avviare.herokuapp.com/api/suscription/some`,
          {
            emprendimientoIdNegocio: props.empreData.id_negocio,
          }
        );
        setSuscriptionData(doc1.data.data);
        console.log(doc1);
      } catch (err) {
        console.log(err);
        Alert.error("Error al Recuperar sus Suscripciones");
      }
    };
    innerFunc();
  };
  //Funciones para el Manejo de Pagos
  const manageStripe = async (amount) => {
    setLoading(true);
    const stripe = await stripePromise;

    const session = await axios.post(
      "https://avviare.herokuapp.com/api/pay/checkout",
      {
        empreId: props.empreData.id_negocio,
        suscripcionData: {
          objeto: "Suscripción Avviare Emprendedores Premium",
          pago: amount,
        },
      }
    );

    const result = await stripe.redirectToCheckout({
      sessionId: session.data.id,
    });
    setLoading(false);
    if (result.error) {
      Alert.error("Error de Conexion a Stripe");
      setLoading(false);
    }
  };
  const handlePaypal = async (amount) => {
    setLoading(true);
    try {
      let time = 1;
      if (amount === 10) {
        time = 1;
      }
      if (amount === 60) {
        time = 7;
      }
      if (amount === 120) {
        time = 14;
      }
      await axios.post(
        `https://avviare.herokuapp.com/api/suscription/createSuscripcion/${props.empreData.id_negocio}`,
        {
          time: time,
        }
      );
      Alert.success("Pago Registrado Exitosamente");
      getSuscriptionData();
    } catch (err) {
      Alert.error("Pago Fallido");

      console.log(err);
    }
    setLoading(false);
  };
  useEffect(getSuscriptionData, []);
  const renderCell = (date) => {
    console.log(suscriptionData);
    const sus = suscriptionData.find((elem) => {
      const current = new Date(elem.fecha_fin);
      return (
        current.getFullYear() === date.getFullYear() &&
        current.getMonth() === date.getMonth() &&
        current.getDate() === date.getDate()
      );
    });

    if (sus) {
      return <Badge content={<Icon icon="diamond" />} />;
    }
    return null;
  };
  return (
    <>
      <FlexboxGrid justify="space-around" align="middle">
        <FlexboxGrid.Item
          componentClass={Col}
          xs={24}
          sm={12}
          style={{ marginTop: "1.5rem" }}
        >
          {/* Pago del Paquete Pichón */}
          <FlexboxGrid justify="center" align="middle">
            <Panel
              shaded
              bordered
              bodyfill="true"
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
                <FlexboxGrid.Item
                  componentClass={Col}
                  colspan={24}
                  style={{ marginTop: "0.5rem" }}
                >
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
                      style={{ width: "200px" }}
                      role="link"
                    >
                      <Icon icon="cc-stripe" /> Stripe
                    </Button>
                  </FlexboxGrid>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item
                  componentClass={Col}
                  colspan={24}
                  style={{ marginTop: "0.5rem" }}
                >
                  <FlexboxGrid
                    style={{ width: "100%" }}
                    justify="center"
                    align="middle"
                  >
                    <FlexboxGrid
                      style={{ width: "50%" }}
                      justify="center"
                      align="middle"
                    >
                      {!loading && (
                        <PayPalButton
                          onButtonReady={() => setSdkLoaded1(true)}
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
                    </FlexboxGrid>
                    {loading && (
                      <Button
                        color="yellow"
                        apperance="primary"
                        disabled
                        style={{ width: "200px" }}
                        role="link"
                      >
                        <Icon icon="paypal" /> Paypal
                      </Button>
                    )}
                  </FlexboxGrid>
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </Panel>
          </FlexboxGrid>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item
          componentClass={Col}
          xs={24}
          sm={12}
          style={{ marginTop: "1.5rem" }}
        >
          <FlexboxGrid justify="center" align="middle">
            {/* Pago del Paquete Lechuza */}

            <Panel
              shaded
              bordered
              bodyfill="true"
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
                <FlexboxGrid.Item
                  componentClass={Col}
                  colspan={24}
                  style={{ marginTop: "0.5rem" }}
                >
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
                      style={{ width: "200px" }}
                      role="link"
                    >
                      <Icon icon="cc-stripe" /> Stripe
                    </Button>
                  </FlexboxGrid>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item
                  componentClass={Col}
                  colspan={24}
                  style={{ marginTop: "0.5rem" }}
                >
                  <FlexboxGrid
                    style={{ width: "100%" }}
                    justify="center"
                    align="middle"
                  >
                    {!loading && (
                      <>
                        {sdkLoaded1 && (
                          <FlexboxGrid
                            style={{ width: "150px" }}
                            justify="center"
                            align="middle"
                          >
                            <PayPalButton
                              onButtonReady={() => {
                                setSdkLoaded2(true);
                              }}
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
                          </FlexboxGrid>
                        )}
                      </>
                    )}
                    {loading && (
                      <FlexboxGrid justify="center" align="middle">
                        <Button
                          color="yellow"
                          apperance="primary"
                          disabled
                          style={{ width: "200px" }}
                          role="link"
                        >
                          <Icon icon="paypal" /> Paypal
                        </Button>
                      </FlexboxGrid>
                    )}
                  </FlexboxGrid>
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </Panel>
          </FlexboxGrid>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item
          componentClass={Col}
          xs={24}
          sm={24}
          style={{ marginTop: "1.5rem" }}
        >
          {/* Pago del Paquete Buho */}
          <FlexboxGrid justify="center" align="middle">
            <Panel
              shaded
              bordered
              bodyfill="true"
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
                <FlexboxGrid.Item
                  componentClass={Col}
                  colspan={24}
                  style={{ marginTop: "0.5rem" }}
                >
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
                      style={{ width: "200px" }}
                      role="link"
                    >
                      <Icon icon="cc-stripe" /> Stripe
                    </Button>
                  </FlexboxGrid>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item
                  componentClass={Col}
                  colspan={24}
                  style={{ marginTop: "0.5rem" }}
                >
                  <FlexboxGrid
                    style={{ width: "100%" }}
                    justify="center"
                    align="middle"
                  >
                    <FlexboxGrid
                      style={{ width: "50%" }}
                      justify="center"
                      align="middle"
                    >
                      {!loading && (
                        <>
                          {sdkLoaded2 && (
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
                        </>
                      )}
                    </FlexboxGrid>
                    {loading && (
                      <Button
                        color="yellow"
                        apperance="primary"
                        disabled
                        style={{ width: "200px" }}
                        role="link"
                      >
                        <Icon icon="paypal" /> Paypal
                      </Button>
                    )}
                  </FlexboxGrid>
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </Panel>
          </FlexboxGrid>
        </FlexboxGrid.Item>
      </FlexboxGrid>
      <FlexboxGrid
        justify="center"
        align="middle"
        style={{ marginTop: "1.5rem" }}
      >
        <Panel bordered shaded style={{ width: "90%", padding: "2%" }}>
          <Calendar bordered renderCell={renderCell} />
        </Panel>
      </FlexboxGrid>
    </>
  );
};
