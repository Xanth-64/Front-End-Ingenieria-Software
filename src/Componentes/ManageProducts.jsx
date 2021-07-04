import {
  Panel,
  FlexboxGrid,
  List,
  Pagination,
  Col,
  Button,
  Icon,
  Drawer,
  Loader,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  SelectPicker,
  CheckPicker,
  Uploader,
  InputGroup,
  Schema,
  IconButton,
  Alert,
} from "rsuite";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AngryOwl } from "../Componentes/AngryOwl";

import { v4 as uuidv4 } from "uuid";
export const ManageProducts = (props) => {
  const { StringType, NumberType, ArrayType } = Schema.Types;
  const [activePage, setActivePage] = useState(1);
  const [productsToShow, setProductsToShow] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [allSubcats, setAllSubcats] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [formValue, setFormValue] = useState({});
  const [sendable, setSendable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [changingData, setChangingData] = useState(false);
  const formSchema = Schema.Model({
    file: ArrayType()
      .isRequired("Debe incluir al menos una Foto")
      .maxLength(5, "Máximo 5 Fotos"),
    nombre: StringType()
      .isRequired("Debe incluir un nombre para su Producto")
      .minLength(5, "Debe tener un Nombre de 5 Caracteres Mínimo")
      .maxLength(20, "Debe tener un Nombre de 20 Caracteres Máximo"),
    descripcion: StringType().isRequired(
      "Debe incluir una descripción para su Producto"
    ),
    peso: StringType().isRequired("Debe indicar el Peso de su Producto"),
    precio: NumberType()
      .isRequired("No puede dejar este campo vacío")
      .min(0, "No puede tener precios negativos"),
  });
  //Funcion Para el Manejo de Ordenamiento de Tarjetitas
  const handleProductListSort = ({ oldIndex, newIndex }) => {
    const moveData = productsToShow.splice(oldIndex, 1);
    const newData = [...productsToShow];
    newData.splice(newIndex, 0, moveData[0]);
    setProductsToShow(newData);
  };
  const getSubcategorías = () => {
    const innerFunc = async () => {
      try {
        const doc1 = await axios.get(
          "https://avviare.herokuapp.com/api/subCategory/all"
        );
        setAllSubcats(
          doc1.data.data.map((elem) => {
            return { label: elem.nombre, value: elem.id_subcat };
          })
        );
      } catch (err) {
        console.log(err);
      }
    };
    innerFunc();
  };
  const getAllProducts = () => {
    const innerFunc = async () => {
      setLoading(true);
      try {
        const doc1 = await axios.post(
          "https://avviare.herokuapp.com/api/productos/some",
          {
            emprendimientoIdNegocio: props.empreData.id_negocio,
          }
        );
        setAllProducts(doc1.data.data);
        setProductsToShow(
          doc1.data.data.length >= 5
            ? doc1.data.data.slice(0, 4)
            : doc1.data.data
        );
      } catch (err) {
        console.log(err);
      }
    };
    innerFunc();
    setLoading(false);
  };
  const reSliceProducts = () => {
    setProductsToShow(allProducts.slice(activePage * 5 - 5, activePage * 5));
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const doc1 = await axios.post(
        "https://avviare.herokuapp.com/api/productos/one",
        {
          nombre: formValue.nombre,
          descripcion: formValue.descripcion,
          isVisible: false,
          peso: formValue.peso,
          precio: formValue.precio,
          condiciones: formValue.condiciones ?? [],
          emprendimientoIdNegocio: props.empreData.id_negocio,
          subcategoriumIdSubcat: formValue.subcategoriumIdSubcat,
          fotos: formValue.fotos
            .filter((elem) => {
              return formValue.file.find((elem2) => {
                return elem2.name === elem.og_filename;
              })
                ? true
                : false;
            })
            .map((elem) => {
              return elem.public_id;
            }),
        }
      );
      getAllProducts();
      setLoading(false);
      setFormValue({});
      setShowDrawer(false);
      Alert.success("Producto Creado Exitosamente");
    } catch (err) {
      console.log(err);
      setLoading(false);
      Alert.error("Error en Creación de Producto");
    }
  };
  const updateVisibility = async (visibility, id) => {
    setChangingData(true);
    try {
      const doc1 = await axios.put(
        `https://avviare.herokuapp.com/api/productos/one/${id}`,
        {
          isVisible: !visibility,
        }
      );
      if (doc1) {
        setAllProducts(
          allProducts.map((elem) => {
            if (elem.id_producto === id) {
              return { ...elem, isVisible: !visibility };
            }
            return elem;
          })
        );
      }
    } catch (err) {
      console.log(err);
      Alert.error("Error Al Cambiar la Visibilidad");
    }
    setChangingData(false);
  };
  const removeProduct = async (id) => {
    setChangingData(true);
    try {
      const doc1 = axios.delete(
        `https://avviare.herokuapp.com/api/productos/one/${id}`
      );
      if (doc1) {
        setAllProducts(
          allProducts.filter((elem) => {
            return elem.id_producto !== id;
          })
        );
      }
    } catch (err) {
      console.log(err);
      Alert.error("Error Al Eliminar el Producto");
    }
    setChangingData(false);
  };
  useEffect(getSubcategorías, []);
  useEffect(getAllProducts, []);
  useEffect(reSliceProducts, [activePage, allProducts]);
  return (
    <FlexboxGrid justify="center" align="middle" style={{ width: "100%" }}>
      <FlexboxGrid.Item
        componentClass={Col}
        xs={24}
        sm={24}
        style={{ marginTop: "2rem", width: "100%" }}
      >
        <FlexboxGrid justify="center" align="middle" style={{ width: "100%" }}>
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
            {loading && (
              <FlexboxGrid justify="center" align="middle">
                <Loader speed="fast" />
              </FlexboxGrid>
            )}
            {!loading && (
              <>
                {allProducts.length === 0 ? (
                  <>
                    <AngryOwl width="75" prompt="No se han Creado Productos" />
                  </>
                ) : (
                  <>
                    <Pagination
                      activePage={activePage}
                      boundaryLink
                      first
                      last
                      prev
                      next
                      maxButtons={5}
                      ellipsis
                      pages={Math.ceil(allProducts.length / 5)}
                      onSelect={(val) => {
                        setActivePage(val);
                      }}
                    />

                    <List bordered sortable onSort={handleProductListSort}>
                      {productsToShow.map((elem, index) => {
                        return (
                          <List.Item
                            key={uuidv4()}
                            index={index}
                            style={{
                              marginTop: "1.5rem",
                              maxHeight: "fit-content",
                            }}
                          >
                            <Panel
                              shaded
                              bordered
                              bodyFill
                              style={{
                                backgroundColor: "#FFFFFF",
                                padding: "5% 10%",
                                margin: "5%",
                              }}
                            >
                              <FlexboxGrid
                                justify="space-around"
                                align="middle"
                              >
                                <FlexboxGrid.Item
                                  classComponent={Col}
                                  xs={8}
                                  sm={8}
                                  style={{ width: "200px" }}
                                >
                                  <Link
                                    to={`/Product/${elem.id_producto}`}
                                    style={{
                                      cursor: "pointer",
                                      textDecoration: "None",
                                      textAlign: "center",
                                    }}
                                  >
                                    <h4>
                                      {elem.nombre.length > 16
                                        ? `${elem.nombre.slice(0, 16)}...`
                                        : elem.nombre}
                                    </h4>
                                  </Link>
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item
                                  classComponent={Col}
                                  xs={8}
                                  sm={8}
                                >
                                  {" "}
                                  <IconButton
                                    icon={
                                      <Icon
                                        icon={
                                          elem.isVisible ? "eye" : "eye-slash"
                                        }
                                      />
                                    }
                                    disabled={changingData}
                                    circle
                                    size="lg"
                                    color={elem.isVisible ? "green" : "red"}
                                    onClick={() => {
                                      updateVisibility(
                                        elem.isVisible,
                                        elem.id_producto
                                      );
                                    }}
                                  />{" "}
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item
                                  classComponent={Col}
                                  xs={8}
                                  sm={8}
                                >
                                  {" "}
                                  <IconButton
                                    icon={<Icon icon={"close"} />}
                                    onClick={() => {
                                      removeProduct(elem.id_producto);
                                    }}
                                    circle
                                    disabled={changingData}
                                    size="lg"
                                    color="red"
                                  />
                                </FlexboxGrid.Item>
                              </FlexboxGrid>
                            </Panel>
                          </List.Item>
                        );
                      })}
                    </List>

                    <Pagination
                      activePage={activePage}
                      boundaryLink
                      first
                      last
                      prev
                      next
                      maxButtons={5}
                      ellipsis
                      pages={Math.ceil(allProducts.length / 5)}
                      onSelect={(val) => {
                        setActivePage(val);
                      }}
                    />
                  </>
                )}
              </>
            )}
          </Panel>
        </FlexboxGrid>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item componentClass={Col} xs={24} sm={24}>
        <FlexboxGrid
          justify="center"
          align="middle"
          style={{ marginTop: "1.5rem" }}
        >
          <Button
            apperance="primary"
            color="green"
            onClick={() => {
              setShowDrawer(true);
            }}
          >
            <Icon icon="plus-circle" /> Añadir Producto
          </Button>
        </FlexboxGrid>
      </FlexboxGrid.Item>
      <Drawer
        full
        keyboard
        placement="right"
        show={showDrawer}
        onHide={() => {
          setFormValue({});
          setShowDrawer(false);
        }}
      >
        <Drawer.Header>
          <Drawer.Title>Crear Producto</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <Form
            onSubmit={(check, e) => {
              e.preventDefault();
              if (sendable) {
                handleSubmit(formValue);
              }
            }}
            onCheck={(formError) => {
              if (Object.keys(formError).length !== 0) {
                setSendable(false);
              } else {
                setSendable(true);
              }
            }}
            onChange={(e) => {
              console.log(e);

              setFormValue(e);
            }}
            formValue={formValue}
            model={formSchema}
          >
            <FlexboxGrid>
              <FlexboxGrid.Item
                xs={24}
                sm={12}
                componentClass={Col}
                style={{ margin: "1rem 0" }}
              >
                <FormGroup>
                  <ControlLabel className="subtitle">Nombre</ControlLabel>
                  <FormControl
                    className="input-width"
                    name="nombre"
                    placeholder="Nombre"
                  />
                </FormGroup>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item
                xs={24}
                sm={12}
                componentClass={Col}
                style={{ margin: "1rem 0" }}
              >
                <FormGroup>
                  <ControlLabel className="subtitle">Descripción</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    rows={8}
                    className="input-width"
                    name="descripcion"
                    placeholder="Descripción"
                  />
                </FormGroup>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item
                xs={24}
                sm={12}
                componentClass={Col}
                style={{ margin: "1rem 0" }}
              >
                <FormGroup>
                  <ControlLabel>Peso</ControlLabel>
                  <FormControl
                    className="input-width"
                    name="peso"
                    placeholder="Peso"
                    accepter={SelectPicker}
                    data={[
                      { label: "Ligero", value: "Ligero" },
                      { label: "Mediano", value: "Mediano" },
                      { label: "Pesado", value: "Pesado" },
                      { label: "Muy Pesado", value: "Muy Pesado" },
                    ]}
                  />
                </FormGroup>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item
                xs={24}
                sm={12}
                componentClass={Col}
                style={{ margin: "1rem 0" }}
              >
                <FormGroup>
                  <ControlLabel>Condiciones</ControlLabel>
                  <FormControl
                    className="input-width"
                    name="condiciones"
                    placeholder="Condiciones"
                    sticky
                    accepter={CheckPicker}
                    data={[
                      { label: "Fragile", value: "Fragile" },
                      { label: "Refrigerado", value: "Refrigerado" },
                      { label: "Líquido", value: "Líquido" },
                    ]}
                  />
                </FormGroup>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item
                xs={24}
                sm={12}
                componentClass={Col}
                style={{ margin: "1rem 0" }}
              >
                <FormGroup>
                  <ControlLabel className="subtitle">Precio</ControlLabel>
                  <InputGroup>
                    <FormControl
                      type="number"
                      className="input-width"
                      name="precio"
                      placeholder={"3.00$"}
                    />
                    <InputGroup.Addon> $</InputGroup.Addon>
                  </InputGroup>
                </FormGroup>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item
                xs={24}
                sm={12}
                componentClass={Col}
                style={{ margin: "1rem 0" }}
              >
                <FormGroup>
                  <ControlLabel className="subtitle">Fotos</ControlLabel>
                  <FormControl
                    name="file"
                    className="input-width"
                    data={{
                      upload_preset: "ml_default",
                    }}
                    accepter={Uploader}
                    multiple={false}
                    draggable={true}
                    action={process.env.REACT_APP_IMGUPLOAD}
                    listType="picture-text"
                    accept=".jpg, .png"
                    onSuccess={(res) => {
                      console.log(res);
                      let newFormValue = formValue;
                      if (newFormValue["fotos"]) {
                        newFormValue["fotos"] = [
                          ...newFormValue["fotos"],
                          {
                            public_id: res.public_id,
                            og_filename: `${res.original_filename}.${res.format}`,
                          },
                        ];
                      } else {
                        newFormValue["fotos"] = [
                          {
                            public_id: res.public_id,
                            og_filename: `${res.original_filename}.${res.format}`,
                          },
                        ];
                      }
                      setFormValue(newFormValue);
                    }}
                  >
                    <Button className="input-width">
                      <Icon icon="camera" size="4x" />
                    </Button>
                  </FormControl>
                </FormGroup>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item
                xs={24}
                sm={12}
                componentClass={Col}
                style={{ margin: "1rem 0" }}
              >
                <FormGroup>
                  <ControlLabel>Sub-Categoría</ControlLabel>
                  <FormControl
                    className="input-width"
                    name="subcategoriumIdSubcat"
                    placeholder="Subcategoría"
                    accepter={SelectPicker}
                    data={allSubcats}
                    preventOverflow
                  />
                </FormGroup>
              </FlexboxGrid.Item>
            </FlexboxGrid>
            <FlexboxGrid>
              <Button
                appearance="primary"
                color="green"
                type="submit"
                disabled={!sendable || loading}
              >
                Crear Producto
              </Button>
            </FlexboxGrid>
          </Form>
        </Drawer.Body>
      </Drawer>
    </FlexboxGrid>
  );
};
