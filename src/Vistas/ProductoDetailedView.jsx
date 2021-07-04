import React from "react";

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
  Placeholder,
} from "rsuite";
import { Image, Transformation } from "cloudinary-react";
import { useCookies } from "react-cookie";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { AngryOwl } from "../Componentes/AngryOwl";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { StarShower } from "../Componentes/StarShower";
import { CommentShower } from "../Componentes/CommentShower";
//Función que busca el producto a mostrar.

export const ProductoDetailedView = (props) => {
  const [cookie] = useCookies(["user"]);
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState({});
  const [subcatData, setSubcatData] = useState(null);
  const { id } = useParams();
  const history = useHistory();
  const getProduct = () => {
    const innerFunc = async () => {
      try {
        const doc = await axios.get(
          `https://avviare.herokuapp.com/api/productos/one/${id}`
        );
        setProductData(doc.data.data[0]);
        if (doc) {
          const doc2 = await axios.get(
            `https://avviare.herokuapp.com/api/subCategory/one/${doc.data.data[0].subcategoriumIdSubcat}`
          );
          setSubcatData(doc2.data.data[0]);
        }
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
                    <Header></Header>
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
                                    <p style={{ marginTop: "1rem" }}>
                                      {productData.descripcion}
                                    </p>
                                    <Divider />
                                    <h5>Subcategoría</h5>
                                    <Button
                                      color={subcatData ? "blue" : "cyan"}
                                      style={{ marginTop: "1rem" }}
                                    >
                                      {" "}
                                      {subcatData
                                        ? subcatData.nombre
                                        : "Ninguna"}
                                    </Button>
                                    <Divider />
                                    <FlexboxGrid
                                      justify="center"
                                      align="middle"
                                    >
                                      <Button
                                        size="lg"
                                        appearance="primary"
                                        color="green"
                                        disabled={cookie.user ? false : true}
                                        onClick={() => {
                                          history.push(
                                            `/Buy/Product/${productData.id_producto}`
                                          );
                                        }}
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
                            <FlexboxGrid justify="center" align="middle">
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
                                  style={{ width: "100%", height: "100%" }}
                                >
                                  {productData.fotos.length === 0 && (
                                    <Placeholder.Graph
                                      width={300}
                                      height={300}
                                    />
                                  )}
                                  {productData.fotos.map((elem) => {
                                    return (
                                      <Image
                                        publicId={elem}
                                        alt="Imagen de un Producto"
                                        width="300"
                                        height="300"
                                        key={uuidv4()}
                                      >
                                        <Transformation
                                          fetchFormat="auto"
                                          crop="fill"
                                        />
                                      </Image>
                                    );
                                  })}
                                </Carousel>
                              </Panel>
                            </FlexboxGrid>
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
