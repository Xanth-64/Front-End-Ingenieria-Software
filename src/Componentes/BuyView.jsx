import {
  Container,
  Header,
  Body,
  Footer,
  Grid,
  Col,
  Row,
  FlexboxGrid,
  Panel,
  Divider,
  Placeholder,
  SelectPicker,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
} from "rsuite";
import { MapRoute } from "./MapRoute";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const BuyView = (props) => {
  const [formData, setFormData] = useState({});
  return (
    <>
      <Container>
        <Header>
          <FlexboxGrid justify="center" align="middle">
            <h2>Compra de Productos Avviare</h2>
          </FlexboxGrid>
        </Header>
        <Body>
          <Grid>
            <Row>
              <Col xs={24} sm={12}>
                <Panel
                  shaded
                  bordered
                  bodyFill
                  style={{
                    width: "95%",
                    backgroundColor: "#FAFAFA",
                    height: "100%",
                    padding: "5% 0",
                  }}
                >
                  <FlexboxGrid justify="center" align="middle">
                    <h3>Delivery</h3>
                  </FlexboxGrid>
                  <FlexboxGrid justify="center" align="middle">
                    <Panel
                      shaded
                      bordered
                      bodyFill
                      style={{
                        width: "95%",
                        backgroundColor: "#FFFFFF",
                        height: "100%",
                        padding: "5% 0",
                      }}
                    >
                      <FlexboxGrid justify="center" align="middle">
                        {formData.driverIndex && (
                          <MapRoute
                            userPosition={props.userData.address}
                            driverPosition={
                              props.driverLocationArr[formData.driverIndex]
                            }
                          />
                        )}
                        {!formData.driverIndex && <Placeholder.Graph />}
                      </FlexboxGrid>
                      <FlexboxGrid justify="center" align="middle">
                        <Form
                          formValue={formData}
                          onChange={(val) => {
                            setFormData(val);
                          }}
                        >
                          <FormGroup>
                            <ControlLabel>Driver:</ControlLabel>
                            <FormControl
                              data={props.driverLocationArr}
                              accepter={SelectPicker}
                              name="driverIndex"
                            />{" "}
                          </FormGroup>
                        </Form>
                      </FlexboxGrid>
                    </Panel>
                  </FlexboxGrid>
                </Panel>
              </Col>
              <Col xs={24} sm={12}>
                <Panel
                  shaded
                  bordered
                  bodyFill
                  style={{
                    width: "95%",
                    backgroundColor: "#FAFAFA",
                    height: "100%",
                    padding: "5% 0",
                  }}
                >
                  <FlexboxGrid justify="center" align="middle">
                    <Panel
                      shaded
                      bordered
                      bodyFill
                      style={{
                        width: "95%",
                        backgroundColor: "#FFFFFF",
                        height: "100%",
                        padding: "5% 0",
                      }}
                    >
                      <Grid>
                        {props.productArr.map((elem) => {
                          return (
                            <Row key={uuidv4()}>
                              <FlexboxGrid justify="space-between">
                                <FlexboxGrid.Item>
                                  <h6></h6>
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item>
                                  <h6></h6>
                                </FlexboxGrid.Item>
                              </FlexboxGrid>
                            </Row>
                          );
                        })}
                      </Grid>
                    </Panel>
                  </FlexboxGrid>
                </Panel>
              </Col>
            </Row>
          </Grid>
        </Body>
        <Footer></Footer>
      </Container>
    </>
  );
};
