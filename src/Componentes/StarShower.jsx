import {
  Button,
  ButtonGroup,
  Panel,
  FlexboxGrid,
  IconButton,
  ButtonToolbar,
  Icon,
} from "rsuite";

export const StarShower = (props) => {
  return (
    <>
      <Panel
        data-testid="star-shower"
        shaded
        bordered
        bodyFill
        style={{
          width: "fit-content",
          height: "fit-content",
          padding: "5%",
        }}
      >
        <FlexboxGrid align="middle" justify="center">
          <h5>Puntaje del Emprendedor</h5>
        </FlexboxGrid>
        <FlexboxGrid
          align="middle"
          justify="center"
          style={{ marginTop: "1rem" }}
        >
          <ButtonToolbar>
            <IconButton
              icon={<Icon icon="star" />}
              color={props.pointsAvg >= 1 ? "yellow" : ""}
              circle
              size="lg"
              style={{ cursor: "default" }}
            />
            <IconButton
              icon={<Icon icon="star" />}
              color={props.pointsAvg >= 2 ? "yellow" : ""}
              circle
              size="lg"
              style={{ cursor: "default" }}
            />
            <IconButton
              icon={<Icon icon="star" />}
              color={props.pointsAvg >= 3 ? "yellow" : ""}
              circle
              size="lg"
              style={{ cursor: "default" }}
            />
            <IconButton
              icon={<Icon icon="star" />}
              color={props.pointsAvg >= 4 ? "yellow" : ""}
              circle
              size="lg"
              style={{ cursor: "default" }}
            />
            <IconButton
              icon={<Icon icon="star" />}
              color={props.pointsAvg >= 5 ? "yellow" : ""}
              circle
              size="lg"
              style={{ cursor: "default" }}
            />
          </ButtonToolbar>
        </FlexboxGrid>
      </Panel>
    </>
  );
};
