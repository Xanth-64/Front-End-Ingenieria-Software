import {
  Container,
  Header,
  Content,
  Nav,
  Loader,
  Panel,
  PanelGroup,
  FlexboxGrid,
  Button,
  Col,
  Modal,
  Schema,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Alert,
  Icon,
  Divider,
  List,
  Placeholder,
  IconButton,
  SelectPicker,
} from "rsuite";
import { Image, Transformation } from "cloudinary-react";

import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { EntrepeneurShower } from "./EntrepeneurShower";
import { AngryOwl } from "./AngryOwl";
export const AdminWorkZone = (props) => {
  const [categoryArr, setCategoryArr] = useState([]);
  const [currentSubcatArr, setCurrentSubcatArr] = useState([]);
  const [userArr, setUserArr] = useState([]);
  const [entrepeneurArr, setEntrepeneurArr] = useState([]);
  const [driverArr, setDriverArr] = useState([]);
  const [empSelect, setEmpSelect] = useState("Emprendimientos");
  let [loading, setLoading] = useState(true);
  let [loadingSubcat, setLoadingSubcat] = useState(false);
  //Variables para Mostrar modales
  //Creacion de Nuevas Categorias
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  //Eliminacion de Categorias ya existentes
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  //Vista de Subcategorias
  const [subCategoryModal, setSubCategoryModal] = useState(false);

  // Variables de los formularios utilizados
  const [categoryData, setCategoryData] = useState({ categoria: "" });
  const [subCategoryData, setSubcategoryData] = useState({ subcategoria: "" });
  const [categoryFormCheck, setcategoryFormCheck] = useState({});
  const { StringType } = Schema.Types;

  const [currentCategory, setCurrentCategory] = useState(null);
  //Modelo para la validacion del form de categorias
  const categoryModel = Schema.Model({
    categoria: StringType()
      .isRequired("No puede dejar este campo vacío")
      .minLength(3, "Debe contener por lo menos 3 caracteres")
      .maxLength(12, "No puede contener más de 12 caracteres"),
  });
  //Modelo para la validacion del form de Subcategorias
  const subCategoryModel = Schema.Model({
    subcategoria: StringType()
      .isRequired("No puede dejar este campo vacío")
      .minLength(3, "Debe contener por lo menos 3 caracteres")
      .maxLength(12, "No puede contener más de 12 caracteres"),
  });
  //Funciones que traen la informacion de cada Campo

  //Obtener todos los usuarios
  const getUsers = async () => {
    try {
      const doc = await axios.get(
        "https://avviare.herokuapp.com/api/usuarios/all"
      );
      if (doc) {
        setUserArr(doc.data.data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  //Obtener todas las categorías
  const getCategories = () => {
    const innerFunction = async () => {
      setLoading(true);
      try {
        const answer = await axios.get(
          "https://avviare.herokuapp.com/api/catalog/all"
        );
        setCategoryArr(answer.data.data);

        setLoading(false);
      } catch (err) {
        setLoading(false);
        return;
      }
    };
    innerFunction();
  };

  //Obtener todos los emprendedores.
  const getEntrepeneurs = async () => {
    try {
      const emprendedores = await axios.get(
        "https://avviare.herokuapp.com/api/empre/all"
      );
      const driveEmpre = await axios.get(
        "https://avviare.herokuapp.com/api/empre_drive/all"
      );
      setEntrepeneurArr(emprendedores.data.data);
      setDriverArr(driveEmpre.data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  //Funciones de los Modales

  //Abrir modal para creacion de nueva Categoria
  const openCreateCategoryModal = () => {
    setShowCategoryModal(true);
  };

  //Cerrar modal para creacion de nueva Categoria
  const hideCreateCategoryModal = () => {
    setShowCategoryModal(false);
  };

  //Submit del modal para creacion de nueva Categoria
  const createCategory = async () => {
    if (categoryData.categoria) {
      try {
        const info = await axios.post(
          "https://avviare.herokuapp.com/api/catalog/one",
          {
            nombre: categoryData.categoria,
          }
        );
        Alert.success("Categoría creada exitosamente");
        const temp = categoryArr;
        temp.push(info.data.data[0]);
        setCategoryArr(temp);
      } catch (err) {
        Alert.error("Error al crear la Categoría. Categoría no creada");
      }

      hideCreateCategoryModal();
    }
  };

  //Mostrar Listado de Subcategorias
  const showSubcatModal = async (currentCat) => {
    try {
      const doc = await axios.get(
        `https://avviare.herokuapp.com/api/subCategory/all/byCategory/${currentCat.id_categoria}`
      );
      if (doc) {
        setCurrentSubcatArr(doc.data.data);
        setCurrentCategory(currentCat);
        setSubCategoryModal(true);
      } else {
        Alert.warning(
          `Error, no se pudieron mostrar las subcategorias de ${currentCat.nombre}`
        );
      }
    } catch (err) {
      Alert.warning(
        `Error, no se pudieron mostrar las subcategorias de ${currentCat.nombre}`
      );
    }
  };

  const hideSubCategoryModal = () => {
    setSubCategoryModal(false);
    setCurrentCategory(null);
  };

  // Eliminar la Subcategoria Elegida
  const removeSubCat = async (element) => {
    if (element) {
      try {
        const doc = await axios.delete(
          `https://avviare.herokuapp.com/api/subCategory/one/${element.id_subcat}`
        );
        if (doc) {
          setCurrentSubcatArr(
            currentSubcatArr.filter((element) => {
              return element.id_subcat !== doc.data.data[0].id_subcat;
            })
          );
          Alert.info(
            `La Subcategoría "${doc.data.data[0].nombre}" fue eliminada con éxito`
          );
        }
      } catch (err) {
        console.log(err);
        Alert.error("La Subcategoría no pudo ser eliminada");
      }
    }
  };
  const createSubcat = async () => {
    try {
      setLoadingSubcat(true);
      if (subCategoryData.subcategoria) {
        const doc = await axios.post(
          `https://avviare.herokuapp.com/api/subCategory/one/byCategory/${currentCategory.id_categoria}`,
          {
            nombre: subCategoryData.subcategoria,
          }
        );
        if (doc) {
          const temp = currentSubcatArr;
          temp.push(doc.data.data[0]);
          setCurrentSubcatArr(temp);
          Alert.success(`Subcategoría creada exitosamente`);
          setLoadingSubcat(false);
        }
      }
    } catch (err) {
      console.log(err);
      Alert.error("No se pudo crear la Subcategoria Elegida");
      setLoadingSubcat(false);
    }
  };
  //Eliminar la categoria elegida.
  const showDeleteCategoryModal = (currentCat) => {
    setCurrentCategory(currentCat);
    setDeleteCategoryModal(true);
  };
  const hideDeleteCategoryModal = () => {
    setDeleteCategoryModal(false);
    setCurrentCategory(null);
  };

  const deleteCategory = async () => {
    if (currentCategory) {
      try {
        const doc = await axios.delete(
          `https://avviare.herokuapp.com/api/catalog/one/${currentCategory.id_categoria}`
        );
        if (doc) {
          setCategoryArr(
            categoryArr.filter((element) => {
              return element.id_categoria !== currentCategory.id_categoria;
            })
          );
          Alert.info(
            `La Categoría "${doc.data.data[0].nombre}" Fue eliminada con éxito.`
          );
          hideDeleteCategoryModal();
        }
      } catch (err) {
        Alert.error("La Categoría no pudo ser eliminada.");
        hideDeleteCategoryModal();
      }
    }
  };
  // Ascender un usuario normal a Admin
  const ascendUser = async (userData) => {
    setLoading(true);
    try {
      const doc = await axios.put(
        `https://avviare.herokuapp.com/api/usuarios/one/${userData.id_usuario}`,
        { tipo: "Administrador" }
      );
      if (doc) {
        Alert.success("Usuario ascendido a Administrador de manera exitosa");
      }

      setUserArr(
        userArr.map((elem) => {
          if (elem.id_usuario === doc.data.data[0].id_usuario) {
            return doc.data.data[0];
          }
          return elem;
        })
      );
      setLoading(false);
    } catch (err) {
      Alert.error("Ascenso a Administrador fallido");
      console.log(err);

      setLoading(false);
    }
  };

  const [active, setActive] = useState("categorias");
  useEffect(getCategories, []);
  return (
    <>
      <Container>
        <Header>
          <Nav
            appearance="subtle"
            activeKey={active}
            onSelect={(activeKey) => {
              setLoading(true);
              setActive(activeKey);
              if (activeKey === "categorias") {
                getCategories();
              }
              if (activeKey === "clientes") {
                getUsers();
              }
              if (activeKey === "empresarios") {
                getEntrepeneurs();
              }
            }}
          >
            <Nav.Item eventKey="categorias">Categorias</Nav.Item>
            <Nav.Item eventKey="clientes">Usuarios</Nav.Item>
            <Nav.Item eventKey="empresarios">Emprendedores/Drivers</Nav.Item>
          </Nav>
        </Header>
        <Content>
          {loading && (
            <>
              <Loader center size="lg" speed="slow" />
            </>
          )}
          {active === "categorias" && !loading && (
            <>
              <PanelGroup accordion bordered>
                {categoryArr.length !== 0 &&
                  categoryArr.map((element) => {
                    return (
                      <Panel header={element.nombre} key={element.nombre}>
                        <FlexboxGrid justify="start" align="middle">
                          <FlexboxGrid.Item>
                            <Button
                              color="green"
                              onClick={() => {
                                showSubcatModal(element);
                              }}
                            >
                              Ver Subcategorías
                            </Button>
                          </FlexboxGrid.Item>
                          <FlexboxGrid.Item>
                            <Button
                              color="red"
                              style={{ marginLeft: "15%" }}
                              onClick={() => {
                                showDeleteCategoryModal(element);
                              }}
                            >
                              Eliminar
                            </Button>
                          </FlexboxGrid.Item>
                        </FlexboxGrid>
                      </Panel>
                    );
                  })}
                {categoryArr.length === 0 && (
                  <AngryOwl prompt="No se encontraron Categorías" width="25" />
                )}
              </PanelGroup>
              <FlexboxGrid justify="center">
                <FlexboxGrid.Item>
                  <Button
                    onClick={openCreateCategoryModal}
                    size="lg"
                    color="blue"
                    style={{ marginTop: "25px" }}
                  >
                    Crear Categoría
                  </Button>
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </>
          )}
          {active === "clientes" && !loading && (
            <>
              <PanelGroup accordion bordered>
                {userArr.length !== 0 &&
                  userArr.map((user) => {
                    return (
                      <Panel
                        header={`${user.nombre} ${user.apellido}`}
                        key={uuidv4()}
                      >
                        <FlexboxGrid justify="space-between" align="middle">
                          <FlexboxGrid.Item componentClass={Col} colspan={12}>
                            <FlexboxGrid justify="center">
                              <span>
                                <b>Nombre:</b> {user.nombre}
                              </span>
                            </FlexboxGrid>
                          </FlexboxGrid.Item>
                          <FlexboxGrid.Item componentClass={Col} colspan={12}>
                            <FlexboxGrid justify="center">
                              <span>
                                <b>Apellido:</b> {user.apellido}{" "}
                              </span>
                            </FlexboxGrid>
                          </FlexboxGrid.Item>
                          <FlexboxGrid.Item componentClass={Col} colspan={12}>
                            <FlexboxGrid justify="center">
                              <span>
                                <b>Correo:</b> {user.email}{" "}
                              </span>
                            </FlexboxGrid>
                          </FlexboxGrid.Item>
                          <FlexboxGrid.Item componentClass={Col} colspan={12}>
                            <FlexboxGrid justify="center">
                              <span>
                                <b>Teléfono:</b> {user.telefono}
                              </span>
                            </FlexboxGrid>
                          </FlexboxGrid.Item>
                          <FlexboxGrid.Item componentClass={Col} colspan={24}>
                            <FlexboxGrid justify="center">
                              {user.imagen_url && (
                                <Image
                                  alt="Imagen del Usuario"
                                  publicId={user.imagen_url}
                                >
                                  <Transformation
                                    width="300"
                                    crop="fill"
                                    gravity="faces"
                                    fetchFormat="auto"
                                  />
                                </Image>
                              )}
                            </FlexboxGrid>
                            {!user.imagen_url && (
                              <Placeholder.Graph active></Placeholder.Graph>
                            )}
                          </FlexboxGrid.Item>
                          <FlexboxGrid.Item
                            componentClass={Col}
                            colspan={24}
                            style={{ marginTop: "1.5rem" }}
                          >
                            <FlexboxGrid justify="center">
                              {user.tipo === "Administrador" && (
                                <>
                                  <Button
                                    color="violet"
                                    style={{ cursor: "default" }}
                                  >
                                    <Icon icon="diamond" /> Administrador
                                  </Button>
                                </>
                              )}
                              {user.tipo === "Cliente" && (
                                <>
                                  <Button
                                    color="red"
                                    style={{ cursor: "default" }}
                                  >
                                    <Icon icon="heart" /> Cliente
                                  </Button>
                                  <IconButton
                                    color="violet"
                                    icon={<Icon icon="arrow-circle-up" />}
                                    onClick={() => {
                                      ascendUser(user);
                                    }}
                                    style={{ marginLeft: "1.5rem" }}
                                  />
                                </>
                              )}
                              {user.tipo === "Emprendedor" && (
                                <>
                                  <Button
                                    color="blue"
                                    style={{ cursor: "default" }}
                                  >
                                    <Icon icon="usd" /> Emprendedor
                                  </Button>
                                </>
                              )}
                              {user.tipo === "Transportista" && (
                                <>
                                  <Button
                                    color="cyan"
                                    style={{ cursor: "default" }}
                                  >
                                    <Icon icon="car" /> Driver
                                  </Button>
                                </>
                              )}
                            </FlexboxGrid>
                          </FlexboxGrid.Item>
                        </FlexboxGrid>
                      </Panel>
                    );
                  })}
                {userArr.length === 0 && (
                  <AngryOwl prompt="No se encontraron Usuarios" width="25" />
                )}
              </PanelGroup>
            </>
          )}
          {active === "empresarios" && !loading && (
            <>
              <FlexboxGrid
                justify="center"
                align="middle"
                style={{ marginTop: "1.5rem" }}
              >
                <FlexboxGrid.Item componentClass={Col} colspan={12}>
                  <SelectPicker
                    cleanable={false}
                    data={[
                      { label: "Negocios", value: "Emprendimientos" },
                      { label: "Drivers", value: "Drivers" },
                    ]}
                    defaultValue="Negocios"
                    appearance="default"
                    value={empSelect}
                    onChange={(value) => {
                      setLoading(true);
                      setEmpSelect(value);
                      getEntrepeneurs();
                    }}
                    block
                  ></SelectPicker>
                </FlexboxGrid.Item>
              </FlexboxGrid>

              <EntrepeneurShower
                type={empSelect}
                dataValues={
                  empSelect === "Drivers" ? driverArr : entrepeneurArr
                }
              />
            </>
          )}
        </Content>
      </Container>

      {/* Modal Zone */}
      {/* Modal para la creacion de Nuevas Categorias */}
      <Modal show={showCategoryModal} onHide={hideCreateCategoryModal}>
        <Modal.Header>
          <Modal.Title>Crear Categoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            fluid
            model={categoryModel}
            onChange={(formVals) => {
              setCategoryData(formVals);
            }}
            onCheck={(formError) => {
              setcategoryFormCheck(formError);
            }}
          >
            <FormGroup>
              <ControlLabel>Nombre de la Categoría</ControlLabel>
              <FormControl name="categoria"></FormControl>
              <HelpBlock tooltip>Campo Obligatorio</HelpBlock>
            </FormGroup>
            <FlexboxGrid justify="space-around">
              <FlexboxGrid.Item>
                <Button
                  appearance="primary"
                  type="submit"
                  onClick={createCategory}
                >
                  Crear Categoría
                </Button>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item>
                <Button
                  appearance="subtle"
                  color="yellow"
                  onClick={hideCreateCategoryModal}
                >
                  Cancelar
                </Button>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal para la Eliminacion de Categorias (Confirmacion) */}
      <Modal show={deleteCategoryModal} onHide={hideDeleteCategoryModal}>
        <Modal.Header>
          <Modal.Title>
            <Icon icon="warning" /> Eliminar Categoría
          </Modal.Title>
        </Modal.Header>
        <Modal.Body justify="center" align="center">
          <FlexboxGrid>
            <FlexboxGrid.Item componentClass={Col} colspan={24}>
              <h6>
                Esta acción no puede deshacerse.
                <br />
                Asegúrese de querer eliminar este elemento.
              </h6>
            </FlexboxGrid.Item>
            <Divider />
            <FlexboxGrid.Item componentClass={Col} colspan={24}>
              <Button color="yellow" size="lg" onClick={deleteCategory}>
                Eliminar
              </Button>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Modal.Body>
      </Modal>
      {/* Modal para el muestreo de Subcategorias */}
      <Modal show={subCategoryModal} onHide={hideSubCategoryModal}>
        {!loadingSubcat && (
          <>
            {currentSubcatArr.length !== 0 && (
              <List bordered hover>
                {currentSubcatArr.map((element) => {
                  return (
                    <List.Item key={uuidv4()}>
                      <FlexboxGrid justify="space-between" align="middle">
                        <FlexboxGrid.Item>
                          <h5>{element.nombre}</h5>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item>
                          <Button
                            color="red"
                            onClick={() => {
                              removeSubCat(element);
                            }}
                          >
                            {" "}
                            <Icon icon="close" /> Eliminar
                          </Button>
                        </FlexboxGrid.Item>
                      </FlexboxGrid>
                    </List.Item>
                  );
                })}
              </List>
            )}
          </>
        )}
        {loadingSubcat && (
          <>
            <div>
              <Loader center size="xs" speed="slow"></Loader>
            </div>
          </>
        )}
        <div>
          <Divider />
        </div>
        <Form
          fluid
          model={subCategoryModel}
          onChange={(formVals) => {
            setSubcategoryData(formVals);
          }}
        >
          <FlexboxGrid justify="center" align="middle">
            <FlexboxGrid.Item componentClass={Col} colspan={24}>
              <FormGroup>
                <ControlLabel>Nombre de la Subcategoría</ControlLabel>
                <FormControl name="subcategoria"></FormControl>
              </FormGroup>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item
              componentClass={Col}
              colspan={24}
              style={{ marginTop: "1.2rem" }}
            >
              <Button color="green" type="submit" onClick={createSubcat}>
                <Icon icon="check-circle" /> Crear Subcategoría
              </Button>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Form>
      </Modal>
    </>
  );
};
