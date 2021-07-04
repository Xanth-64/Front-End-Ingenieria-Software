import { FlexboxGrid, Panel, Loader } from "rsuite";
import { EmpreWorkZone } from "../Componentes/EmpreWorkZone";
import { AngryOwl } from "../Componentes/AngryOwl";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

export const EmpreWorkspace = () => {
  // Obtencion de Datos del Emprendimiento
  const [empreData, setEmpreData] = useState({});
  const [loading, setLoading] = useState(true);
  const [cookie] = useCookies(["user"]);
  const getEmpreData = () => {
    const innerFunc = async () => {
      try {
        const doc1 = await axios.get(
          "https://avviare.herokuapp.com/api/empre/all"
        );

        setEmpreData(
          doc1.data.data.find((elem) => {
            return elem.usuarioIdUsuario === cookie.user.id;
          })
        );
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    innerFunc();
  };

  useEffect(getEmpreData, []);
  return (
    <>
      <FlexboxGrid
        justify="center"
        align="middle"
        style={{ marginTop: "2rem" }}
      >
        <Panel
          shaded
          bordered
          bodyFill
          style={{
            width: "85%",
            backgroundColor: "#FAFAFA",
            height: "100%",
            padding: "2%",
          }}
        >
          <Panel
            shaded
            bordered
            bodyFill
            style={{
              width: "100%",
              backgroundColor: "#FFFFFF",
              height: "100%",
              padding: "0 0 5% 0",
            }}
          >
            {!loading && (
              <>
                {empreData && (
                  <>
                    <EmpreWorkZone empreData={empreData} />
                  </>
                )}
                {!empreData && (
                  <>
                    <FlexboxGrid justify="center" align="middle">
                      <AngryOwl
                        width={75}
                        prompt="No se pudo encontrar Emprendimiento Asociado a Usted"
                      />
                    </FlexboxGrid>
                  </>
                )}
              </>
            )}
            {loading && (
              <>
                <FlexboxGrid justify="center" align="middle">
                  <Loader speed="slow" size="lg" />
                </FlexboxGrid>
              </>
            )}
          </Panel>
        </Panel>
      </FlexboxGrid>
    </>
  );
};
