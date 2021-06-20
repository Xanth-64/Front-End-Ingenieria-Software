import { FlexboxGrid, Col } from "rsuite";
import buhitoMalo from "../Assets/LogoAvviareSoloBuhitoAngry.svg";
export const AngryOwl = (props) => {
  return (
    <>
      <FlexboxGrid justify="center" align="middle">
        <FlexboxGrid.Item componentClass={Col} colspan={24}>
          <FlexboxGrid justify="center">
            <img
              alt="Nothing Found Error"
              src={buhitoMalo}
              style={{ width: `${props.width}%` }}
            />
          </FlexboxGrid>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item componentClass={Col} colspan={24}>
          <FlexboxGrid justify="center">
            <h3>{`${props.prompt}`}</h3>
          </FlexboxGrid>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
};
