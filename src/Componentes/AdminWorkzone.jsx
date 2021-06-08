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
} from "rsuite";
import { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import buhitoMalo from "../Assets/LogoAvviareSoloBuhitoAngry.svg";

export const AdminWorkZone = (props) => {
  const [categoryArr, setCategoryArr] = useState([]);
  let userArr = [];
  let entrepeneurArr = [];
  let driverArr = [];
  let [loading, setLoading] = useState(true);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categoryData, setCategoryData] = useState({ categoria: "" });
  const [categoryFormCheck, setcategoryFormCheck] = useState({});
  const { StringType } = Schema.Types;
  //Modelo para la validacion del form de categorias
  const categoryModel = Schema.Model({
    categoria: StringType().isRequired("No puede dejar este campo en Blanco"),
  });
  //Funciones que traen la informacion de cada Campo
  //Obtener todas las categorias
  const getCategories = async () => {
    try {
      const answer = await axios.get(
        "https://avviare.herokuapp.com/api/catalog/all"
      );
      setCategoryArr(answer.data.data);
      if (answer) {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };
  //Obtener todos los usuarios
  const getUsers = () => {
    axios
      .get("https://avviare.herokuapp.com/api/usuarios/all")
      .then((response) => {
        userArr = response.data;
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };
  //Obtener todos los emprendedores.
  //Obtener todos los drivers.

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
    console.log("Chimbooo");
  };
  getCategories();
  const [active, setActive] = useState("categorias");
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
                      <Panel
                        header={element.nombre}
                        activeKey={uuidv4()}
                        key={uuidv4()}
                      ></Panel>
                    );
                  })}
                {categoryArr.length === 0 && (
                  <>
                    <FlexboxGrid justify="center" align="middle">
                      <FlexboxGrid.Item componentClass={Col} colspan={24}>
                        <FlexboxGrid justify="center">
                          <img
                            alt="Nothing Found Error"
                            src={buhitoMalo}
                            style={{ width: "25%" }}
                          />
                        </FlexboxGrid>
                      </FlexboxGrid.Item>
                      <FlexboxGrid.Item componentClass={Col} colspan={24}>
                        <FlexboxGrid justify="center">
                          <h3>No se encontraron Categorías</h3>
                        </FlexboxGrid>
                      </FlexboxGrid.Item>
                    </FlexboxGrid>
                  </>
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
            </>
          )}
          {active === "clientes" && !loading && <>Clientes</>}
          {active === "empresarios" && !loading && <>Corte Empresario</>}
        </Content>
      </Container>
    </>
  );
};
