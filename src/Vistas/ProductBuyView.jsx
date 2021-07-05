import { FlexboxGrid, Loader } from "rsuite";
import { BuyView } from "../Componentes/BuyView";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
export const ProductBuyView = (props) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [productArr, setProductArr] = useState([]);
  const [driverLocationArr, setDriverLocationArr] = useState([]);
  const [cookie] = useCookies();
  let { id } = useParams();

  const getData = () => {
    const innerFunc = async () => {
      try {
        const doc1 = await axios.post(
          "https://avviare.herokuapp.com/api/address/some",
          {
            usuarioIdUsuario: cookie.user.id,
          }
        );
        const doc2 = await axios.get(
          `https://avviare.herokuapp.com/api/productos/one/${id}`
        );
        const doc3 = await axios.get(
          "https://avviare.herokuapp.com/api/drivers/all/withAddress"
        );
        setUserData({
          address: {
            lat: Number(doc1.data.data[0].latitud),
            lng: Number(doc1.data.data[0].longitud),
          },
          id_usuario: cookie.user.id,
        });
        setProductArr([
          {
            ...doc2.data.data[0],
            price: doc2.data.data[0].precio,
            product_id: doc2.data.data[0].id_producto,
          },
        ]);
        setDriverLocationArr(
          doc3.data.data.map((elem, index) => {
            return {
              nombre: `${elem.usuario.nombre} ${elem.usuario.apellido}`,
              value: index,
              tarifa: elem.tarifa,
              id_transportista: elem.id_transportista,
              address: {
                lat: Number(elem.usuario.direccion.latitud),
                lng: Number(elem.usuario.direccion.longitud),
              },
            };
          })
        );
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    setLoading(true);
    innerFunc();
  };
  useEffect(getData, []);
  return (
    <>
      <FlexboxGrid
        justify="center"
        align="middle"
        style={{ marginTop: "2rem" }}
      >
        <FlexboxGrid justify="center" align="middle" style={{ width: "95%" }}>
          {!loading && (
            <BuyView
              userData={userData}
              driverLocationArr={driverLocationArr}
              productArr={productArr}
            />
          )}
          {loading && (
            <FlexboxGrid justify="center" align="middle">
              <Loader speed="fast" />
            </FlexboxGrid>
          )}
        </FlexboxGrid>
      </FlexboxGrid>
    </>
  );
};
