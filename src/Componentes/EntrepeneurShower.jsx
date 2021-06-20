import {
  Panel,
  PanelGroup,
  FlexboxGrid,
  Icon,
  IconButton,
  Toggle,
  Alert,
  Loader,
} from "rsuite";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { AngryOwl } from "./AngryOwl";
import { useState } from "react";
export const EntrepeneurShower = (props) => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <PanelGroup>
        {props.dataValues.length !== 0 &&
          props.dataValues.map((element) => {
            return (
              <Panel key={uuidv4()}>
                <FlexboxGrid justify="space-around" align="middle">
                  {props.type === "Emprendimientos" && (
                    <FlexboxGrid.Item>
                      <h4 style={{ width: "8rem" }}>{element.name_empresa}</h4>
                    </FlexboxGrid.Item>
                  )}
                  {props.type === "Drivers" && (
                    <FlexboxGrid.Item style={{ width: "8rem" }}>
                      <h4>{element.nombre}</h4>
                    </FlexboxGrid.Item>
                  )}
                  <FlexboxGrid.Item>
                    <Toggle
                      size="lg"
                      defaultChecked={element.verificado}
                      checkedchildren={<Icon icon="check" />}
                      unCheckedchildren={<Icon icon="close" />}
                      onChange={async (checked) => {
                        try {
                          const route =
                            props.type === "Drivers" ? "empre_drive" : "empre";

                          const doc = await axios.put(
                            `https://avviare.herokuapp.com/api/${route}/one/${
                              props.type === "Drivers"
                                ? element.id_empre
                                : element.id_negocio
                            }`,
                            { verificado: checked }
                          );

                          if (!doc) {
                            Alert.error(
                              `No se pudo realizar la actualización de el perfil del Emprendedor`
                            );
                          }
                        } catch (err) {
                          Alert.error(
                            `No se pudo realizar la actualización de el perfil del Emprendedor`
                          );

                          console.log(err);
                        }
                      }}
                    />
                    {loading && <Loader size="sm" content="Actualizando..." />}
                  </FlexboxGrid.Item>
                  <FlexboxGrid.Item>
                    <Link
                      to={`/${props.type}/${
                        props.type === "Drivers"
                          ? element.id_empre
                          : element.id_negocio
                      }`}
                    >
                      <IconButton
                        color="cyan"
                        size="lg"
                        icon={<Icon size="4x" icon="external-link" />}
                      />
                    </Link>
                  </FlexboxGrid.Item>
                </FlexboxGrid>
              </Panel>
            );
          })}
        {props.dataValues.length === 0 && (
          <AngryOwl
            prompt="No se encontraron Emprendimientos bajo esta categoría"
            width="25"
          />
        )}
      </PanelGroup>
    </>
  );
};
