import {
  Grid,
  Col,
  Row,
  Container,
  Header,
  Content,
  Footer,
  Panel,
  FlexboxGrid,
  Loader,
  Carousel,
  Divider,
  Button,
  Icon,
} from "rsuite";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AngryOwl } from "../Componentes/AngryOwl";
import { NavBar } from "../Componentes/navBar";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { StarShower } from "../Componentes/StarShower";
import { CommentShower } from "../Componentes/CommentShower";
//Función que busca el producto a mostrar.

export const ProductoDetailedView = (props) => {
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState({});
  const { id } = useParams();
  const getProduct = () => {
    const innerFunc = async () => {
      console.log(id);
      try {
        const doc = await axios.get(
          `https://avviare.herokuapp.com/api/productos/one/${id}`
        );
        setProductData(doc.data.data[0]);
        console.log(productData);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    innerFunc();
  };
  useEffect(getProduct, []);
  return (
    <>
      {loading && (
        <>
          <Loader center size="lg" speed="slow" />
        </>
      )}
      {!loading && (
        <>
          {productData && (
            <>
              {productData.isVisible && (
                <>
                  <Container>
                    <Header>
                      <NavBar />
                    </Header>
                    <Content style={{ margin: "5vh 5vw" }}>
                      <Grid fluid gutter={150}>
                        <Row componentClass={FlexboxGrid} align="middle">
                          <Col
                            xs={24}
                            sm={12}
                            style={{ marginTop: "1.5rem", height: "100%" }}
                          >
                            <FlexboxGrid
                              align="middle"
                              style={{ height: "100%" }}
                            >
                              <Panel
                                shaded
                                bordered
                                bodyFill
                                style={{
                                  width: "100%",
                                  backgroundColor: "#FAFAFA",
                                  height: "100%",
                                  padding: "5% 0",
                                }}
                              >
                                <FlexboxGrid justify="center" align="middle">
                                  <h2>{productData.nombre}</h2>
                                </FlexboxGrid>
                                <FlexboxGrid justify="center" align="middle">
                                  <Panel
                                    shaded
                                    bordered
                                    bodyFill
                                    style={{
                                      width: "90%",
                                      backgroundColor: "#FFFFFF",
                                      padding: "1rem",
                                      height: "100%",
                                    }}
                                  >
                                    <h5>Descripción</h5>
                                    <p>{productData.descripcion}</p>
                                    <Divider />
                                    <h5>Subcategoría</h5>

                                    <Divider />
                                    <FlexboxGrid
                                      justify="center"
                                      align="middle"
                                    >
                                      <Button
                                        size="lg"
                                        appearance="primary"
                                        color="green"
                                      >
                                        <Icon icon="shopping-bag" /> Comprar
                                        Ahora
                                      </Button>
                                    </FlexboxGrid>
                                  </Panel>
                                </FlexboxGrid>
                              </Panel>
                            </FlexboxGrid>
                          </Col>
                          <Col xs={24} sm={12} style={{ marginTop: "1.5rem" }}>
                            <Panel
                              shaded
                              bordered
                              bodyFill
                              style={{ width: "100%", height: "100%" }}
                            >
                              <Carousel
                                shape="bar"
                                className="custom-slider"
                                autoplay
                              >
                                {productData.fotos.map((elem) => {
                                  return (
                                    <img
                                      alt="Foto del Producto"
                                      src={elem}
                                      key={uuidv4()}
                                    />
                                  );
                                })}
                              </Carousel>
                            </Panel>
                          </Col>
                        </Row>
                        <Row
                          style={{ height: "fit-content", marginTop: "1.5rem" }}
                        >
                          <Col xs={24} sm={24}>
                            <FlexboxGrid align="middle" justify="center">
                              <StarShower pointsAvg={4} />
                            </FlexboxGrid>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={24} sm={24}>
                            {" "}
                            <CommentShower
                              commentArr={[
                                {
                                  fecha: "24-06-2021",
                                  comentario: "Me gustan los Corgis",
                                },
                                {
                                  fecha: "25-06-2021",
                                  comentario: "A mi tambien",
                                },
                                {
                                  fecha: "24-06-2021",
                                  comentario: "A mi no :c",
                                },
                              ]}
                            />
                          </Col>
                        </Row>
                      </Grid>
                    </Content>
                    <Footer></Footer>
                  </Container>
                </>
              )}
              {!productData.isVisible && (
                <AngryOwl
                  width="40"
                  prompt="El producto que se intentó buscar no es visible actualmente."
                ></AngryOwl>
              )}
            </>
          )}
          {!productData && (
            <AngryOwl
              width="40"
              prompt="No existe el producto buscado. Será redirigido hacia la vista de Home."
            ></AngryOwl>
          )}
        </>
      )}
    </>
  );
};
