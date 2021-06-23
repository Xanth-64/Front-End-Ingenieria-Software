import React from "react";
import {
  Container,
  Header,
  Content,
  IconButton,
  FlexboxGrid,
  Loader,
  Icon,
  Drawer,
  Footer,
  Form,
  FormGroup,
  FormControl,
  CheckTreePicker,
  ControlLabel,
} from "rsuite";
import { useLocation } from "react-router-dom";

import { ProductListShower } from "../Componentes/ProductListShower";
import axios from "axios";
import { useState, useEffect } from "react";

export const CatalogView = (props) => {
  //Funcion Callback para obtener todos los productos.
  const [currentProducts, setCurrentProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [innerLoading, setInnerLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [formData, setFormData] = useState({ subCat: [] });
  const [filterOptions, setFilterOptions] = useState([]);

  let currentQuery = useLocation();

  const getAllProducts = () => {
    const innerFunc = async () => {
      try {
        setLoading(true);

        const doc1 = await axios.get(
          "https://avviare.herokuapp.com/api/productos/all/withCategories"
        );

        doc1.data.data.forEach((elem) => {
          let categoryFilter = {
            label: elem.nombre,
            value: elem.nombre,
            children: [],
          };
          elem.subcategoria.forEach((elem2) => {
            categoryFilter.children.push({
              label: elem2.nombre,
              value: elem2.nombre,
            });
            elem2.productos.forEach((elem3) => {
              const temp = currentProducts;
              temp.push({
                ...elem3,
                categoria: elem.nombre,
                subcategoria: elem2.nombre,
              });
              setCurrentProducts(temp);
            });
          });
          const temp2 = filterOptions;
          temp2.push(categoryFilter);
          setFilterOptions(temp2);
        });
        setFilteredProducts(currentProducts);
        filterProducts();
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    innerFunc();
  };

  const showDrawer = () => {
    setShowFilter(true);
  };
  const hideDrawer = () => {
    setShowFilter(false);
  };
  const filterProducts = () => {
    setInnerLoading(true);
    try {
      let foundProds = [];
      if (formData.subCat.length === 0) {
        foundProds = currentProducts;
      } else {
        console.log("filtrate");
        foundProds = currentProducts.filter((elem) => {
          const found = formData.subCat.find((cat) => {
            return cat === elem.categoria || cat === elem.subcategoria;
          });
          if (found) {
            return true;
          }
          return false;
        });
      }
      const query = new URLSearchParams(currentQuery.search);
      if (query.get("query")) {
        foundProds = foundProds.filter((elem) => {
          return (
            elem.nombre
              .toLowerCase()
              .search(query.get("query").toLowerCase()) !== -1
          );
        });
      }
      setFilteredProducts(foundProds);
    } catch (err) {
      console.log(err);
    }
    setInnerLoading(false);
  };

  //useEffect Callbacks
  useEffect(getAllProducts, []);
  useEffect(filterProducts, [formData, currentQuery]);
  // Component Return
  return (
    <Container>
      {!loading && (
        <>
          <Header>
            <FlexboxGrid justify="center" style={{ margin: "1.5rem 0" }}>
              <IconButton
                icon={<Icon icon="filter" size="5x" />}
                onClick={showDrawer}
                color="green"
                appearance="primary"
              />
            </FlexboxGrid>
          </Header>
          <Content>
            <FlexboxGrid justify="center" align="middle">
              {!innerLoading && (
                <ProductListShower productArr={filteredProducts} />
              )}
              {innerLoading && <Loader speed="fast" center />}
            </FlexboxGrid>
          </Content>
          <Footer></Footer>
          <Drawer onHide={hideDrawer} show={showFilter} full>
            <Drawer.Header>
              <Drawer.Title>Filtros</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <FlexboxGrid justify="center" align="middle">
                <Form
                  formValue={formData}
                  style={{ width: "80%" }}
                  onChange={(val, event) => {
                    setFormData(val);
                  }}
                >
                  <FormGroup style={{ width: "100%" }}>
                    <ControlLabel>Categorías</ControlLabel>
                    <FormControl
                      accepter={CheckTreePicker}
                      data={filterOptions}
                      name="subCat"
                      style={{ width: "100%" }}
                    />
                  </FormGroup>
                </Form>
              </FlexboxGrid>
            </Drawer.Body>
          </Drawer>
        </>
      )}
      {loading && <Loader size="lg" speed="slow" center />}
    </Container>
  );
};
