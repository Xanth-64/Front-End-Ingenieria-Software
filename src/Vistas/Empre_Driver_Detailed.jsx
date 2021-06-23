import React from "react";

import { EmprendimientoProfileDataShower } from "../Componentes/EmprendimientoProfileDataShower";
import { AngryOwl } from "../Componentes/AngryOwl";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Loader } from "rsuite";

import { useState, useEffect } from "react";
export const Empre_Driver_Detailed = (props) => {
  const [driverArr, setDriverArr] = useState([]);
  const [loading, setLoading] = useState(true);
  const [empreDrive, setEmpreDrive] = useState({});
  const { id } = useParams();
  const getData = () => {
    const innerFunc = async () => {
      try {
        const doc1 = await axios.get(
          `https://avviare.herokuapp.com/api/empre_drive/one/${id}`
        );
        const doc2 = await axios.get(
          `https://avviare.herokuapp.com/api/drivers/some/byEmpreDrive/${id}`
        );

        setDriverArr(doc2.data.data[0].drivers);
        setEmpreDrive(doc1.data.data[0]);

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    innerFunc();
  };

  useEffect(getData, []);
  return (
    <>
      {loading && <Loader size="lg" speed="slow" center />}
      {!loading && (
        <>
          {empreDrive && (
            <EmprendimientoProfileDataShower
              driverData={driverArr}
              empreData={empreDrive}
            />
          )}
          {!empreDrive && (
            <AngryOwl
              width="50"
              prompt="El Emprendimiento de Drivers solicitado no se pudo encontrar."
            />
          )}
        </>
      )}
    </>
  );
};
