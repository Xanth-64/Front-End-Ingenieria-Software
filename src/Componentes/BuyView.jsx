import {
  Container,
  Header,
  Content,
  Footer,
  Grid,
  Col,
  Row,
  FlexboxGrid,
  Panel,
  Divider,
  Placeholder,
  SelectPicker,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Icon,
  Alert,
  Loader,
} from "rsuite";
import { MapRoute } from "./MapRoute";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation, useHistory } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";

export const BuyView = (props) => {
  const history = useHistory();
  const [formData, setFormData] = useState({ driverIndex: 0 });
  const [priceSum, setPriceSum] = useState(0);
  const [qrCode, setQrCode] = useState(uuidv4());
  const [loading, setLoading] = useState(false);
  const stripePromise = loadStripe(
    "pk_test_51IukCSDDymNJk4N6kW95BdQ1sKQ6RGeGtuz33wMDQ8WxPpYyfw0JGEyf0eyzZ7gz9xormuw9Au9mPZwN7IndR33F00x1kxNICY"
  );
  const location = useLocation();
  const getSum = () => {
    let sum = 0;
    props.productArr.forEach((elem) => {
      sum = sum + elem.price + elem.price * 0.1;
    });
    setPriceSum(sum);
  };

  const manageStripe = async () => {
    const stripe = await stripePromise;
    const session = await axios.post(
      "https://avviare.herokuapp.com/api/pay/checkout",
      {
        productArr: [
          ...props.productArr,
          {
            nombre: `Pago Driver ${
              props.driverLocationArr[formData.driverIndex].nombre
            }`,
            price: props.driverLocationArr[formData.driverIndex].tarifa,
          },
        ],
        qr: qrCode,
        url: location.pathname,
        driveId: props.driverLocationArr[formData.driverIndex].id_transportista,
      }
    );
    console.log(session);
    const result = await stripe.redirectToCheckout({
      sessionId: session.data.id,
    });

    if (result.error) {
      Alert.error("Error de Conexion a Stripe");
    }
  };

  const manageStripeFinish = () => {
    const innerFunc = async () => {
      const query = new URLSearchParams(location.search);
      if (query.get("state") && query.get("qr") && query.get("dr")) {
        if (query.get("state") === "success") {
          try {
            setLoading(true);
            let sum = 0;
            props.productArr.forEach((elem) => {
              sum = sum + elem.price + elem.price * 0.1;
            });
            const doc1 = await axios.put(
              "https://avviare.herokuapp.com/api/pedido/some",
              {
                where: { qr: query.get("qr") },
                changes: {
                  monto_tienda: sum / 1.1,
                  monto_driver:
                    props.driverLocationArr[formData.driverIndex].tarifa,
                  monto_total:
                    Math.round(
                      (sum +
                        props.driverLocationArr[formData.driverIndex].tarifa +
                        props.driverLocationArr[formData.driverIndex].tarifa *
                          0.1) *
                        100
                    ) / 100,
                  driverIdTransportista: parseInt(query.get("dr")),
                  usuarioIdUsuario: props.userData.id_usuario,
                },
              }
            );
            if (doc1.data.data.length !== 0) {
              console.log(doc1.data.data.length);
              await axios.post(
                `https://avviare.herokuapp.com/api/pedido/linkProds/${doc1.data.data[0].id_pedido}`,
                {
                  productIdArr: props.productArr.map((elem) => {
                    return elem.product_id;
                  }),
                }
              );
              Alert.success("Pago con Stripe Registrado Exitosamente");
            } else {
              Alert.error("Error Registrando su Pago.");
            }
            setLoading(false);
          } catch (err) {
            console.log(err);
            Alert.error("Error Registrando su Pago.");
            setLoading(false);
          }
        }
      }
    };
    innerFunc();
  };

  const handlePaypal = async () => {
    try {
      setLoading(true);
      let sum = 0;
      props.productArr.forEach((elem) => {
        sum = sum + elem.price + elem.price * 0.1;
      });
      const doc1 = await axios.post(
        "https://avviare.herokuapp.com/api/pedido/one",
        {
          qr: qrCode,
          usuarioIdUsuario: props.userData.id_usuario,
          monto_tienda: sum / 1.1,
          monto_driver: props.driverLocationArr[formData.driverIndex].tarifa,
          monto_total:
            Math.round(
              (sum +
                props.driverLocationArr[formData.driverIndex].tarifa +
                props.driverLocationArr[formData.driverIndex].tarifa * 0.1) *
                100
            ) / 100,
          driverIdTransportista:
            props.driverLocationArr[formData.driverIndex].id_transportista,
        }
      );

      if (doc1) {
        await axios.post(
          `https://avviare.herokuapp.com/api/pedido/linkProds/${doc1.data.data[0].id_pedido}`,
          {
            productIdArr: props.productArr.map((elem) => {
              return elem.product_id;
            }),
          }
        );
      }
      Alert.success("Pago con Paypal Registrado Exitosamente");
      setLoading(false);
    } catch (err) {
      console.log(err);
      Alert.error("Error Registrando su Pago.");
      setLoading(false);
    }
  };
  useEffect(getSum, []);
  useEffect(manageStripeFinish, [location]);
  return (
    <>
      {!loading && (
        <Container>
          <Header>
            <FlexboxGrid justify="center" align="middle">
              <h2 style={{ textAlign: "center" }}>
                Compra de Productos Avviare
              </h2>
            </FlexboxGrid>
          </Header>
          <Content>
            <Grid>
              <Row>
                <Col xs={24} md={12} style={{ marginTop: "2rem" }}>
                  <FlexboxGrid justify="center" align="middle">
                    <Panel
                      shaded
                      bordered
                      bodyFill
                      style={{
                        width: "95%",
                        backgroundColor: "#FAFAFA",
                        height: "100%",
                        padding: "5% 0",
                      }}
                    >
                      <FlexboxGrid justify="center" align="middle">
                        <h3>Delivery</h3>
                      </FlexboxGrid>
                      <FlexboxGrid justify="center" align="middle">
                        <Panel
                          shaded
                          bordered
                          bodyFill
                          style={{
                            width: "95%",
                            backgroundColor: "#FFFFFF",
                            height: "100%",
                            padding: "5% 0",
                          }}
                        >
                          <FlexboxGrid justify="center" align="middle">
                            {(formData.driverIndex ||
                              formData.driverIndex === 0) && (
                              <MapRoute
                                userPosition={props.userData.address}
                                driverPosition={
                                  props.driverLocationArr[formData.driverIndex]
                                    .address
                                }
                              />
                            )}
                            {!(
                              formData.driverIndex || formData.driverIndex === 0
                            ) && (
                              <Placeholder.Graph width="400px" height="400px" />
                            )}
                          </FlexboxGrid>
                          <FlexboxGrid justify="center" align="middle">
                            <Form
                              formValue={formData}
                              onChange={(val) => {
                                console.log(val);
                                setFormData(val);
                              }}
                            >
                              <FormGroup>
                                <ControlLabel>Driver:</ControlLabel>
                                <FormControl
                                  data={props.driverLocationArr}
                                  accepter={SelectPicker}
                                  name="driverIndex"
                                  labelKey="nombre"
                                />{" "}
                              </FormGroup>
                            </Form>
                          </FlexboxGrid>
                        </Panel>
                      </FlexboxGrid>
                    </Panel>
                  </FlexboxGrid>
                </Col>
                <Col xs={24} md={12} style={{ marginTop: "2rem" }}>
                  <FlexboxGrid justify="center" align="middle">
                    <Panel
                      shaded
                      bordered
                      bodyFill
                      style={{
                        width: "95%",
                        backgroundColor: "#FAFAFA",
                        height: "100%",
                        padding: "5% 0",
                      }}
                    >
                      <FlexboxGrid justify="center" align="middle">
                        <Panel
                          shaded
                          bordered
                          bodyFill
                          style={{
                            width: "95%",
                            backgroundColor: "#FFFFFF",
                            height: "100%",
                            padding: "5% 0",
                          }}
                        >
                          <Grid style={{ width: "100%" }}>
                            {props.productArr.map((elem) => {
                              return (
                                <Row
                                  key={uuidv4()}
                                  style={{ margin: "1.5rem 0" }}
                                >
                                  <FlexboxGrid
                                    justify="space-around"
                                    align="middle"
                                  >
                                    <FlexboxGrid.Item>
                                      <h6>
                                        {elem.nombre.length >= 12
                                          ? elem.nombre.slice(0, 13) + "..."
                                          : elem.nombre}
                                      </h6>
                                    </FlexboxGrid.Item>
                                    <FlexboxGrid.Item>
                                      <h6>{`${(
                                        elem.price +
                                        elem.price * 0.1
                                      ).toFixed(2)}`}</h6>
                                    </FlexboxGrid.Item>
                                  </FlexboxGrid>
                                </Row>
                              );
                            })}
                            <Row>
                              <Divider />
                            </Row>
                            {(formData.driverIndex ||
                              formData.driverIndex === 0) && (
                              <Row style={{ margin: "1.5rem 0" }}>
                                <FlexboxGrid
                                  justify="space-around"
                                  align="middle"
                                >
                                  <FlexboxGrid.Item>
                                    <h6>Tarifa Driver:</h6>
                                  </FlexboxGrid.Item>
                                  <FlexboxGrid.Item>
                                    <h6>{`$${(
                                      props.driverLocationArr[
                                        formData.driverIndex
                                      ].tarifa +
                                      props.driverLocationArr[
                                        formData.driverIndex
                                      ].tarifa *
                                        0.1
                                    ).toFixed(2)}`}</h6>
                                  </FlexboxGrid.Item>
                                </FlexboxGrid>
                              </Row>
                            )}

                            <Row style={{ margin: "1.5rem 0" }}>
                              {(formData.driverIndex ||
                                formData.driverIndex === 0) && (
                                <FlexboxGrid
                                  justify="space-around"
                                  align="middle"
                                >
                                  <FlexboxGrid.Item>
                                    <h5>Total:</h5>
                                  </FlexboxGrid.Item>
                                  <FlexboxGrid.Item>
                                    <h5>{`$${(
                                      priceSum +
                                      props.driverLocationArr[
                                        formData.driverIndex
                                      ].tarifa +
                                      props.driverLocationArr[
                                        formData.driverIndex
                                      ].tarifa *
                                        0.1
                                    ).toFixed(2)}`}</h5>
                                  </FlexboxGrid.Item>
                                </FlexboxGrid>
                              )}
                            </Row>
                            <Row>
                              <Divider />
                            </Row>
                            <Row style={{ margin: "1.5rem 0" }}>
                              <FlexboxGrid
                                justify="space-around"
                                align="middle"
                              >
                                <FlexboxGrid
                                  justify="center"
                                  align="middle"
                                  style={{ width: "200px", margin: "0.5rem 0" }}
                                >
                                  <Button
                                    color="violet"
                                    apperance="primary"
                                    disabled={
                                      !(
                                        formData.driverIndex ||
                                        formData.driverIndex === 0
                                      )
                                    }
                                    onClick={manageStripe}
                                    style={{ width: "100%" }}
                                    role="link"
                                  >
                                    <Icon icon="cc-stripe" /> Stripe
                                  </Button>
                                </FlexboxGrid>
                                <FlexboxGrid
                                  justify="center"
                                  align="middle"
                                  style={{ width: "200px", margin: "0.5rem 0" }}
                                >
                                  {(formData.driverIndex ||
                                    formData.driverIndex === 0) && (
                                    <PayPalButton
                                      onApprove={async () => {
                                        await handlePaypal();
                                        history.push(
                                          `${location.search}?state=success`
                                        );
                                      }}
                                      onError={() => {
                                        Alert.error("Pago Fallido");
                                      }}
                                      onCancel={() => {
                                        Alert.error("Error, Pago Cancelado.");
                                      }}
                                      amount={
                                        Math.round(
                                          (priceSum +
                                            props.driverLocationArr[
                                              formData.driverIndex
                                            ].tarifa +
                                            props.driverLocationArr[
                                              formData.driverIndex
                                            ].tarifa *
                                              0.1) *
                                            100
                                        ) / 100
                                      }
                                      style={{
                                        color: "blue",
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
                                  {!(
                                    formData.driverIndex ||
                                    formData.driverIndex === 0
                                  ) && (
                                    <Button
                                      apperance="primary"
                                      color="blue"
                                      disabled
                                      style={{ width: "100%" }}
                                    >
                                      <Icon icon="paypal" /> Paypal
                                    </Button>
                                  )}
                                </FlexboxGrid>
                              </FlexboxGrid>
                            </Row>
                          </Grid>
                        </Panel>
                      </FlexboxGrid>
                    </Panel>
                  </FlexboxGrid>
                </Col>
              </Row>
            </Grid>
          </Content>
          <Footer></Footer>
        </Container>
      )}
      {loading && <Loader center size="lg" speed="slow" />}
    </>
  );
};
