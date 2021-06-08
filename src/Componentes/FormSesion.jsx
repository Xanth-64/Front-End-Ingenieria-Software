import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  FlexboxGrid,
  Button,
  Col,
  Row,
  RadioGroup,
  Radio,
} from "rsuite";
export const FormSesion = ({
  SubmitFunction, // Función de enviar
  Inputlabels, // Descripción de los Input
  buttonText, // Texto del Botón
  title, // TÍtulo del Formulario
}) => {
  const [formValue, setFormValue] = useState({});
  return (
    <>
      <div className="form-container-title">
        <h1 className="form-title">{title}</h1>
      </div>
      <Form
        onSubmit={(check, e) => {
          console.log(formValue);
          SubmitFunction(formValue);
        }}
        onChange={(e) => {
          setFormValue(e);
        }}
        formValue={formValue}
      >
        <FlexboxGrid justify="center">
          {Inputlabels.map((value, index) => {
            let style = `form-container-field-${value.label}`;
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
                            console.log(formValue);
                          }}
                          controlId="radioList"
                        >
                          {value.inputs.map((optionValue, index) => {
                            return (
                              <>
                                <Radio value={optionValue.label}>
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
          <FlexboxGrid.Item
            componentClass={Col}
            colspan={24}
            md={24}
            className="form-input"
          >
            <Button appearance="primary" color="green" type="submit">
              {buttonText}
            </Button>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Form>
    </>
  );
};
