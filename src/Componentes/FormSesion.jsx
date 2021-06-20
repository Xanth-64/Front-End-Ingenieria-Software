import React, { useState } from "react";
import { Map } from "./Map";
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  FlexboxGrid,
  Button,
  ButtonGroup,
  Col,
  RadioGroup,
  Radio,
  Uploader,
  Icon,
} from "rsuite";
export const FormSesion = ({
  SubmitFunction, // Función de enviar
  Inputlabels, // Descripción de los Input
  buttonText, // Texto del Botón
  title, // TÍtulo del Formulario
  showMap, // Boolean de si aparece el mapa o no
  bFunction, // Funcion de ir atrás
  onChange, //Funcion on Change
}) => {
  const [formValue, setFormValue] = useState({});

  return (
    <>
      <div className="form-container-title">
        <h1 className="form-title">{title}</h1>
      </div>
      <Form
        onSubmit={(check, e) => {
          SubmitFunction(formValue);
        }}
        onChange={(e) => {
          setFormValue(e);
        }}
        formValue={formValue}
      >
        <FlexboxGrid justify="center">
          {Inputlabels.map((value, index) => {
            switch (value.type) {
              case "radio":
                return (
                  <div>
                    <h1>{value.label}</h1>
                    <FlexboxGrid.Item
                      componentClass={Col}
                      colspan={24}
                      md={24}
                      className="form-input"
                    >
                      <FormGroup>
                        <RadioGroup
                          name={value.label}
                          onChange={(v) => {
                            setFormValue({
                              ...formValue,
                              [value.label]: v,
                            });
                          }}
                        >
                          {value.inputs.map((optionValue, index) => {
                            return (
                              <>
                                <Radio
                                  value={optionValue.label}
                                  checked={index == 1}
                                >
                                  {optionValue.label}
                                </Radio>
                              </>
                            );
                          })}
                        </RadioGroup>
                      </FormGroup>
                    </FlexboxGrid.Item>
                  </div>
                );
              case "image":
                return (
                  <FlexboxGrid.Item
                    componentClass={Col}
                    colspan={24}
                    md={12}
                    className="form-input"
                  >
                    <FormGroup>
                      <ControlLabel className="subtitle">
                        Foto de Pefil
                      </ControlLabel>
                      <Uploader
                        onUpload={(File) => {
                          console.log(File);
                        }}
                      >
                        <Button className="input-width">
                          <Icon icon="avatar" size="4x" />
                        </Button>
                      </Uploader>
                    </FormGroup>
                  </FlexboxGrid.Item>
                );
              default:
                return (
                  <FlexboxGrid.Item
                    componentClass={Col}
                    colspan={24}
                    md={12}
                    className="form-input"
                  >
                    <FormGroup>
                      <ControlLabel className="subtitle">
                        {value.label}
                      </ControlLabel>
                      <FormControl
                        type={value.type}
                        className="input-width"
                        name={value.label}
                        placeholder={value.label}
                      />
                    </FormGroup>
                  </FlexboxGrid.Item>
                );
            }
          })}

          {showMap === "T" && (
            <FlexboxGrid.Item
              componentClass={Col}
              colspan={24}
              md={24}
              className="form-input"
            >
              <Map />
            </FlexboxGrid.Item>
          )}
          <FlexboxGrid.Item
            componentClass={Col}
            colspan={24}
            md={24}
            className="form-input"
          >
            <ButtonGroup>
              {bFunction && (
                <Button
                  appearance="subtle"
                  color="green"
                  type="button"
                  onClick={bFunction}
                >
                  {" "}
                  Atrás{" "}
                </Button>
              )}
              <Button appearance="primary" color="green" type="submit">
                {buttonText}
              </Button>
            </ButtonGroup>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Form>
    </>
  );
};
