import { Image, Transformation } from "cloudinary-react";
import { useCookies } from "react-cookie";
import { Panel, FlexboxGrid, Button, Icon, Col } from "rsuite";
import { useHistory } from "react-router-dom";

export const PerfilUsuario = (props) => {
  const [cookie, setCookie] = useCookies(["user"]);
  const history = useHistory();
  return (
    <>
      <FlexboxGrid
        justify="center"
        align="middle"
        style={{ margin: "2rem 0" }}
        data-testid="PruebitaPerfil"
      >
        <Panel bordered shaded style={{ width: "80%", padding: "3% 2%" }}>
          <div className="cardContainer space-around wh-290vw">
            <FlexboxGrid
              justify="space-around"
              align="middle"
              style={{ width: "100%" }}
            >
              <FlexboxGrid.Item classComponent={Col} xs={8} sm={4}>
                <h6 style={{ textAlign: "center" }}>
                  {props.dataUsuario.nombre}
                </h6>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item classComponent={Col} xs={8} sm={4}>
                <h6 style={{ textAlign: "center" }}>
                  {props.dataUsuario.apellido}
                </h6>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item classComponent={Col} xs={8} sm={4}>
                <h6 style={{ textAlign: "center" }}>
                  {props.dataUsuario.email}
                </h6>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item classComponent={Col} xs={8} sm={4}>
                <h6 style={{ textAlign: "center" }}>
                  {props.dataUsuario.telefono}
                </h6>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item classComponent={Col} xs={8} sm={4}>
                <h6 style={{ textAlign: "center" }}>
                  {props.dataUsuario.tipo}
                </h6>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </div>

          <div
            className="cardContainer space-around wh-290vw"
            style={{ color: "#277276" }}
          >
            <h5>Imagen de Perfil</h5>
          </div>

          <div className="cardContainer space-around wh-290vw">
            <Image
              width="200"
              height="200"
              publicId={props.dataUsuario.imagen_url}
              alt="Imagen de Perfil"
            >
              <Transformation
                width="200"
                height="200"
                fetchFormat="auto"
                crop="fill"
              />
            </Image>
          </div>
          <FlexboxGrid
            justify="center"
            align="bottom"
            style={{ marginTop: "3rem" }}
          >
            <Button
              size="lg"
              appearance="primary"
              color="#003234"
              onClick={() => {
                history.push(`/Compras/All`);
              }}
            >
              <Icon icon="shopping-bag" /> Historial Compras
            </Button>
          </FlexboxGrid>
          <FlexboxGrid
            justify="center"
            align="bottom"
            style={{ marginTop: "3rem" }}
          >
            {props.dataUsuario.tipo === "Administrador" ? (
              <Button
                size="lg"
                appearance="primary"
                color="violet"
                onClick={() => {
                  history.push(`/Manage/Administrator`);
                }}
              >
                <Icon icon="diamond" /> Zona de Trabajo
              </Button>
            ) : (
              <></>
            )}
            {props.dataUsuario.tipo === "Transportista" ? (
              <Button
                size="lg"
                appearance="primary"
                color="blue"
                onClick={() => {
                  history.push(`/Manage/Driver`);
                }}
              >
                <Icon icon="truck" /> Zona de Trabajo
              </Button>
            ) : (
              <></>
            )}
            {props.dataUsuario.tipo === "Emprendedor" ? (
              <Button
                size="lg"
                appearance="primary"
                color="green"
                onClick={() => {
                  history.push(`/Manage/Emprendimiento`);
                }}
              >
                <Icon icon="usd" /> Zona de Trabajo
              </Button>
            ) : (
              <></>
            )}
          </FlexboxGrid>
        </Panel>
      </FlexboxGrid>
    </>
  );
};
