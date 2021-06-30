import { FlexboxGrid, Container, Header, Content, Panel } from "rsuite";
import { SuscriptionManager } from "./SuscriptionManager";
import { useState } from "react";

export const EmprendimientoProfileModifier = (props) => {
  return (
    <>
      <FlexboxGrid justify="center" align="middle">
        <Panel
          bodyfill
          shaded
          bordered
          style={{
            width: "95%",
            backgroundColor: "#FAFAFA",
            height: "100%",
            padding: "5% 0",
          }}
        >
          <Container>
            <Header style={{ textAlign: "center" }}>
              <h2>Perfil</h2>
            </Header>
            <Content>
              <FlexboxGrid style={{ margin: "1.5rem 0" }}>
                {/* TODO Añadir el Perfil*/}
              </FlexboxGrid>
              <FlexboxGrid style={{ margin: "1.5rem 0" }}>
                <SuscriptionManager empreData={props.empreData} />
              </FlexboxGrid>
            </Content>
          </Container>
        </Panel>
      </FlexboxGrid>
    </>
  );
};
