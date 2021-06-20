import {
  Container,
  Header,
  Content,
  Footer,
  List,
  Panel,
  Sidebar,
  FlexboxGrid,
  Col,
  Button,
  Icon,
  Avatar,
  Drawer,
  Grid,
  Row,
} from "rsuite";
import { Image, Transformation } from "cloudinary-react";
import { v4 as uuidv4 } from "uuid";

import { useState } from "react";

import { NavBar } from "./navBar";

export const EmprendimientoProfileDataShower = (props) => {
  const [driverArr, setDriverArr] = useState(props.driverData);
  const [currentDriverData, setCurrentDriverData] = useState(null);
  const [showDriverDrawer, setShowDriverDrawer] = useState(false);
  const handleDriverlistSort = ({ oldIndex, newIndex }) => {
    const moveData = driverArr.splice(oldIndex, 1);
    const newData = [...driverArr];
    newData.splice(newIndex, 0, moveData[0]);
    setDriverArr(newData);
  };

  const showDriverData = (driverData) => {
    setCurrentDriverData(driverData);
    setShowDriverDrawer(true);
  };
  return (
    <>
      <Container>
        <Header>
          <NavBar />
        </Header>
        <Content>
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
              <Container>
                <Header>
                  <Panel
                    bordered
                    bodyFill
                    style={{
                      width: "100%",
                      backgroundColor: "#FFFFFF",
                      height: "100%",
                      padding: "5% 0",
                    }}
                  >
                    <FlexboxGrid justify="center" align="middle">
                      <h2
                        style={{
                          textAlign: "center",
                          wordBreak: "break-word",
                        }}
                      >
                        {props.empreData.nombre
                          ? props.empreData.nombre
                          : props.empreData.name_empresa}
                      </h2>
                    </FlexboxGrid>
                  </Panel>
                </Header>
                <Content>
                  <Container>
                    <Sidebar style={{ maxWidth: "40%" }}>
                      {/* Sidebar de Emprendimientos Comunes */}
                      {props.empreData.name_empresa && (
                        <>
                          <FlexboxGrid justify="center" align="middle">
                            <FlexboxGrid.Item
                              componentClass={Col}
                              sm={24}
                              xs={24}
                              style={{ marginTop: "1.5rem" }}
                            >
                              <FlexboxGrid justify="center" align="middle">
                                <Image
                                  publicId={props.userData.imagen_url}
                                  alt={`${props.userData.nombre} ${props.userData.apellido}`}
                                >
                                  <Transformation
                                    radius="max"
                                    height="100"
                                    width="100"
                                    crop="fill"
                                    loading="lazy"
                                    gravity="faces"
                                  />
                                </Image>
                              </FlexboxGrid>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item
                              componentClass={Col}
                              sm={24}
                              xs={24}
                              style={{ marginTop: "1.5rem" }}
                            >
                              <FlexboxGrid
                                justify="center"
                                align="middle"
                                style={{
                                  textAlign: "center",
                                  wordBreak: "break-word",
                                }}
                              >
                                <h6>
                                  {`${props.userData.nombre} ${props.userData.apellido}`}
                                </h6>
                              </FlexboxGrid>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item
                              componentClass={Col}
                              sm={24}
                              xs={24}
                              style={{ marginTop: "1.5rem" }}
                            >
                              <FlexboxGrid justify="center" align="middle">
                                <div
                                  style={{
                                    textAlign: "center",
                                    wordBreak: "break-word",
                                  }}
                                >
                                  <h6>{`${props.userData.email}`}</h6>
                                </div>
                              </FlexboxGrid>
                            </FlexboxGrid.Item>
                          </FlexboxGrid>
                        </>
                      )}

                      {/* Sidebar de Empresas de Drivers */}
                      {props.empreData.nombre && (
                        <>
                          <List bordered sortable onSort={handleDriverlistSort}>
                            {driverArr.map((elem, index) => {
                              return (
                                <List.Item key={uuidv4()} index={index}>
                                  <FlexboxGrid
                                    align="middle"
                                    justify="space-around"
                                  >
                                    <FlexboxGrid.Item>
                                      <h6>{`${elem.usuario.nombre} ${elem.usuario.apellido}`}</h6>
                                    </FlexboxGrid.Item>
                                    <FlexboxGrid.Item>
                                      <Button
                                        color="violet"
                                        size="sm"
                                        appearance="primary"
                                        onClick={() => {
                                          showDriverData(elem);
                                        }}
                                      >
                                        <Icon icon="profile" /> Ver Información
                                      </Button>
                                    </FlexboxGrid.Item>
                                  </FlexboxGrid>
                                </List.Item>
                              );
                            })}
                          </List>
                        </>
                      )}
                    </Sidebar>
                    {/* Cuerpo de ambos tipos de Emprendimientos */}
                    <Content>
                      <Panel
                        bordered
                        bodyFill
                        style={{
                          width: "100%",
                          backgroundColor: "#FFFFFF",
                          height: "100%",
                          padding: "5% 0",
                        }}
                      >
                        <FlexboxGrid justify="center" align="middle">
                          <FlexboxGrid.Item
                            componentClass={Col}
                            sm={24}
                            xs={24}
                            style={{ marginTop: "1.5rem" }}
                          >
                            <h6>
                              <center>{props.empreData.descripcion}</center>
                            </h6>
                          </FlexboxGrid.Item>
                          <FlexboxGrid.Item
                            componentClass={Col}
                            sm={24}
                            xs={24}
                            style={{ marginTop: "1.5rem" }}
                          >
                            <FlexboxGrid justify="center" align="middle">
                              {props.empreData.verificado ? (
                                <Button
                                  appearance="primary"
                                  color="green"
                                  style={{ cursor: "default" }}
                                >
                                  Verificado <Icon icon="check-circle" />
                                </Button>
                              ) : (
                                <Button
                                  appearance="primary"
                                  color="red"
                                  style={{ cursor: "default" }}
                                >
                                  No Verificado <Icon icon="close-circle" />
                                </Button>
                              )}
                            </FlexboxGrid>
                          </FlexboxGrid.Item>
                        </FlexboxGrid>
                      </Panel>
                    </Content>
                  </Container>
                </Content>
              </Container>
            </Panel>
          </FlexboxGrid>
        </Content>
        <Footer></Footer>
      </Container>

      {/* Drawers y Modales */}

      <Drawer
        show={showDriverDrawer}
        onHide={() => {
          setShowDriverDrawer(false);
        }}
        placement="bottom"
        full
        style={{ overflowY: "scroll" }}
      >
        {currentDriverData && (
          <>
            <Drawer.Header>
              <Drawer.Title>
                <h3>
                  <center>{`${currentDriverData.usuario.nombre} ${currentDriverData.usuario.apellido}`}</center>
                </h3>
              </Drawer.Title>
            </Drawer.Header>
            <FlexboxGrid justify="center" align="middle">
              <Panel
                bordered
                shaded
                bodyFill
                style={{
                  width: "95%",
                  backgroundColor: "#FFFFFF",
                  height: "100%",
                  padding: "5% 0",
                }}
              >
                <Grid fluid style={{ width: "100%", height: "100%" }}>
                  <Row gutter={20} style={{ marginTop: "1.5rem" }}>
                    <Col xs={24} sm={24}>
                      <FlexboxGrid justify="center" align="middle">
                        <Image
                          publicId={currentDriverData.usuario.imagen_url}
                          alt={`${currentDriverData.usuario.nombre} ${currentDriverData.usuario.apellido}`}
                        >
                          <Transformation
                            radius="max"
                            height="250"
                            width="250"
                            crop="fill"
                            loading="lazy"
                            gravity="faces"
                          />
                        </Image>
                      </FlexboxGrid>
                    </Col>
                  </Row>
                  <Row gutter={20} style={{ marginTop: "1.5rem" }}>
                    <Col xs={24} sm={12}>
                      <FlexboxGrid justify="center" align="middle">
                        <h6>{currentDriverData.usuario.email}</h6>
                      </FlexboxGrid>
                    </Col>
                    <Col xs={24} sm={12}>
                      <FlexboxGrid justify="center" align="middle">
                        <h6>{currentDriverData.usuario.telefono}</h6>
                      </FlexboxGrid>
                    </Col>
                  </Row>
                  <Row gutter={20} style={{ marginTop: "1.5rem" }}>
                    <Col xs={24} sm={12}>
                      <FlexboxGrid justify="center" align="middle">
                        <Image
                          publicId={currentDriverData.certi_salud}
                          alt="Certificado Medico"
                        >
                          <Transformation
                            height="300"
                            width="300"
                            crop="fill"
                            loading="lazy"
                          />
                        </Image>
                      </FlexboxGrid>
                    </Col>
                    <Col xs={24} sm={12}>
                      <FlexboxGrid justify="center" align="middle">
                        <Image
                          publicId={currentDriverData.licencia_picture}
                          alt={"Permiso de Conducir"}
                        >
                          <Transformation
                            height="300"
                            width="300"
                            crop="fill"
                            loading="lazy"
                          />
                        </Image>
                      </FlexboxGrid>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={24} sm={24}>
                      <FlexboxGrid justify="center" align="middle">
                        {currentDriverData.active ? (
                          <Button color="green" style={{ cursor: "default" }}>
                            <Icon icon="check" /> Activo
                          </Button>
                        ) : (
                          <Button color="red" style={{ cursor: "default" }}>
                            <Icon icon="close" /> Inactivo
                          </Button>
                        )}
                      </FlexboxGrid>
                    </Col>
                  </Row>
                </Grid>
              </Panel>
            </FlexboxGrid>
          </>
        )}
      </Drawer>
    </>
  );
};
