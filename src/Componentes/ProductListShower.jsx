import { useState, useEffect } from "react";
import {
  List,
  Panel,
  Pagination,
  FlexboxGrid,
  Carousel,
  Loader,
  Placeholder,
} from "rsuite";
import { Image, Transformation } from "cloudinary-react";

import { v4 as uuidv4 } from "uuid";
export const ProductListShower = (props) => {
  const [activePage, setActivePage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [productArr, setProductArr] = useState(
    props.productArr.length >= 5
      ? props.productArr.slice(0, 4)
      : props.productArr
  );
  const handleProductListSort = ({ oldIndex, newIndex }) => {
    const moveData = productArr.splice(oldIndex, 1);
    const newData = [...productArr];
    newData.splice(newIndex, 0, moveData[0]);
    setProductArr(newData);
  };

  const handleNav = () => {
    setLoading(true);
    setProductArr(props.productArr.slice(activePage * 5 - 5, activePage * 5));
    setLoading(false);
  };

  useEffect(handleNav, [activePage, props.productArr]);
  return (
    <>
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
        {!loading && (
          <List bordered sortable onSort={handleProductListSort}>
            {productArr.map((elem, index) => {
              return (
                <List.Item
                  key={uuidv4()}
                  index={index}
                  style={{ marginTop: "1.5rem", maxHeight: "fit-content" }}
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
                    <FlexboxGrid justify="space-between" align="middle">
                      <FlexboxGrid.Item>
                        <FlexboxGrid justify="center" align="middle">
                          {elem.fotos.length !== 0 && (
                            <Carousel
                              autoplay
                              placement="left"
                              shape="bar"
                              style={{ width: "200px", height: "200px" }}
                            >
                              {elem.fotos.map((pic) => {
                                return (
                                  <Image
                                    publicId={pic}
                                    alt="Imagen de un Producto"
                                    key={uuidv4()}
                                  >
                                    <Transformation
                                      width="200"
                                      height="200"
                                      fetchFormat="auto"
                                      crop="fill"
                                    />
                                  </Image>
                                );
                              })}
                            </Carousel>
                          )}
                          {elem.fotos.length === 0 && (
                            <Placeholder.Graph
                              width="200"
                              height="200"
                              active={false}
                            />
                          )}
                        </FlexboxGrid>
                      </FlexboxGrid.Item>
                      <FlexboxGrid.Item>
                        <h3
                          style={{
                            wordBreak: "break-all",
                            textAlign: "center",
                            display: "block",
                          }}
                        >
                          {elem.nombre.length > 16
                            ? elem.nombre.slice(0, 16) + "..."
                            : elem.nombre}
                        </h3>
                      </FlexboxGrid.Item>
                      <FlexboxGrid.Item>
                        <h4
                          style={{
                            textAlign: "center",
                          }}
                        >{`$${(elem.precio + elem.precio * 0.1).toFixed(
                          2
                        )}`}</h4>
                      </FlexboxGrid.Item>
                    </FlexboxGrid>
                  </Panel>
                </List.Item>
              );
            })}
          </List>
        )}
        {loading && <Loader speed="fast" center />}

        <Pagination
          activePage={activePage}
          boundaryLink
          first
          last
          prev
          next
          maxButtons={5}
          ellipsis
          pages={Math.ceil(props.productArr.length / 5)}
          onSelect={(val) => {
            setActivePage(val);
          }}
        />
      </Panel>
    </>
  );
};
