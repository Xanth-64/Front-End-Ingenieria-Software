import React from "react";

import { EmprendimientoProfileDataShower } from "../Componentes/EmprendimientoProfileDataShower";
import { AngryOwl } from "../Componentes/AngryOwl";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Loader } from "rsuite";
import { useState, useEffect } from "react";
export const EmprendedorDetailedView = (props) => {
  const [currentEmpre, setCurrentEmpre] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const getData = () => {
    const innerFunc = async () => {
      try {
        const doc1 = await axios.get(
          `https://avviare.herokuapp.com/api/empre/one/${id}`
        );
        const doc2 = await axios.get(
          `https://avviare.herokuapp.com/api/empre/empre_usuario/${id}`
        );
        console.log(doc2);
        setCurrentEmpre(doc1.data.data[0]);
        setCurrentUser(doc2.data.data[0]);
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
      {loading && <Loader size="lg" center speed="slow" />}
      {!loading && (
        <>
          {currentEmpre && currentUser && (
            <EmprendimientoProfileDataShower
              empreData={currentEmpre}
              userData={currentUser}
            />
          )}
          {!(currentEmpre && currentUser) && (
            <>
              <AngryOwl
                width="50"
                prompt="El Emprendimiento solicitado no se pudo encontrar."
              />
            </>
          )}
        </>
      )}
    </>
  );
};
