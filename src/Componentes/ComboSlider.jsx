import { ComboCard } from "./ComboCard";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useState, useEffect } from "react";
import { AngryOwl } from "./AngryOwl";
export const ComboSlider = () => {
  const [productList, setProductList] = useState([]);
  const getProducts = () => {
    const innerFunc = async () => {
      const doc1 = await axios.post(
        "https://avviare.herokuapp.com/api/productos/some",
        { isVisible: true }
      );

      let tempArr = [];
      if (doc1.data.data.length) {
        for (let index = 0; index < 3; index++) {
          const element =
            doc1.data.data[
              Math.round(Math.random() * (doc1.data.data.length - 1))
            ];
          tempArr.push(element);
        }
      }
      setProductList(tempArr);
    };
    innerFunc();
  };
  useEffect(getProducts, []);

  return (
    <div className="cardContainer space-around wh-70vw">
      {productList.length === 0 && (
        <AngryOwl width="85" prompt="No se Encontraron Productos" />
      )}
      {productList.map((product) => {
        return <ComboCard thing={product} key={uuidv4()} />;
      })}
    </div>
  );
};
