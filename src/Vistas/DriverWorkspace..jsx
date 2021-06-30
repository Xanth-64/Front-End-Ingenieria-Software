import { FlexboxGrid, Panel } from "rsuite";
import { DriverWorkZone } from "../Componentes/DriverWorkZone";
export const DriverWorkspace = () => {
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
            padding: "5%",
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
              padding: "0 5% 5% 5%",
            }}
          >
            <DriverWorkZone />
          </Panel>
        </Panel>
      </FlexboxGrid>
    </>
  );
};
