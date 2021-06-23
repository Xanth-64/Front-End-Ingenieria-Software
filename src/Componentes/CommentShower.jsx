import { Panel, PanelGroup, FlexboxGrid } from "rsuite";
import { AngryOwl } from "./AngryOwl";
import { v4 as uuidv4 } from "uuid";

export const CommentShower = (props) => {
  return (
    <>
      <FlexboxGrid justify="center" style={{ margin: "1.5rem 0" }}>
        <PanelGroup bordered shaded style={{ width: "80%" }}>
          {props.commentArr.length !== 0 &&
            props.commentArr.map((element) => {
              return (
                <Panel
                  header={<h4>{element.fecha}</h4>}
                  bodyFill
                  bordered
                  key={uuidv4()}
                  style={{ padding: "10%" }}
                >
                  <h6>
                    <i>{`"${element.comentario}"`}</i>
                  </h6>
                </Panel>
              );
            })}
        </PanelGroup>
      </FlexboxGrid>
    </>
  );
};
