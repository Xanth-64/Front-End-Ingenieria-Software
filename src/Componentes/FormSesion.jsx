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
  CheckboxGroup,
  Checkbox,
  Uploader,
  Icon,
  InputGroup,
} from "rsuite";
import InputGroupAddon from "rsuite/lib/InputGroup/InputGroupAddon";

export const FormSesion = ({
  SubmitFunction, // Función de enviar
  Inputlabels, // Descripción de los Input
  buttonText, // Texto del Botón
  title, // TÍtulo del Formulario
  showMap, // Boolean de si aparece el mapa o no
  bFunction, // Funcion de ir atrás
  setMap, //Funcion on Change
  Schema, //El esquema, pasado como los InputsLabels
}) => {
  const [formValue, setFormValue] = useState({});
  const [sendable, setSendable] = useState(false);
  return (
    <>
      <div className="form-container-title">
        <h1 className="form-title">{title}</h1>
      </div>
      <Form
        onSubmit={(check, e) => {
          e.preventDefault();
          if (sendable) {
            SubmitFunction(formValue);
          }
        }}
        onCheck={(formError) => {
          if (Object.keys(formError).length !== 0) {
            setSendable(false);
          } else {
            setSendable(true);
          }
        }}
        onChange={(e) => {
          setFormValue(e);
        }}
        formValue={formValue}
        model={Schema}
      >
        <FlexboxGrid justify="center">
          {Inputlabels.map((value, index) => {
            switch (value.type) {
              case "radio":
                return (
                  <>
                    <FlexboxGrid.Item
                      componentClass={Col}
                      colspan={24}
                      md={12}
                      sm={24}
                      className="form-input"
                    >
                      <FormGroup>
                        <ControlLabel>{value.label}</ControlLabel>
                        <RadioGroup
                          name={value.name}
                          onChange={(v) => {
                            setFormValue({
                              ...formValue,
                              [value.name]: v,
                            });
                          }}
                        >
                          {value.inputs.map((optionValue, index) => {
                            return (
                              <>
                                <Radio
                                  value={optionValue.name}
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
                  </>
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
                        {value.label}
                      </ControlLabel>
                      <FormControl
                        name="file"
                        className="input-width"
                        data={{
                          upload_preset: "ml_default",
                        }}
                        accepter={Uploader}
                        multiple={false}
                        draggable={true}
                        action={process.env.REACT_APP_IMGUPLOAD}
                        listType="picture-text"
                        accept=".jpg, .png"
                        onSuccess={(res, file) => {
                          let value = formValue;
                          value.image_url = res.url;
                          setFormValue(value);
                        }}
                      >
                        <Button className="input-width">
                          <Icon icon="avatar" size="4x" />
                        </Button>
                      </FormControl>
                    </FormGroup>
                  </FlexboxGrid.Item>
                );
              case "picture":
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
                        name={value.modelName}
                        className="input-width"
                        data={{
                          upload_preset: "ml_default",
                        }}
                        accepter={Uploader}
                        multiple={false}
                        draggable={true}
                        action={process.env.REACT_APP_IMGUPLOAD}
                        listType="picture-text"
                        accept=".jpg, .png"
                        onSuccess={(res, file) => {
                          let newFormValue = formValue;
                          newFormValue[value.name] = res.url;
                          setFormValue(newFormValue);
                        }}
                      >
                        <Button className="input-width">
                          <Icon icon="briefcase" size="4x" />
                        </Button>
                      </FormControl>
                    </FormGroup>
                  </FlexboxGrid.Item>
                );
              case "phone":
                return (
                  <FlexboxGrid.Item
                    componentClass={Col}
                    colspan={24}
                    md={12}
                    sm={24}
                    className="form-input"
                  >
                    <FormGroup>
                      <ControlLabel className="subtitle">
                        {value.label}
                      </ControlLabel>
                      <FormControl
                        className="input-width"
                        name={value.name}
                        type="text"
                        placeholder="04143994567"
                      ></FormControl>
                    </FormGroup>
                  </FlexboxGrid.Item>
                );
              case "multiple select":
                return (
                  <>
                    <FlexboxGrid.Item
                      componentClass={Col}
                      colspan={24}
                      md={12}
                      sm={24}
                      className="form-input"
                    >
                      <FormGroup>
                        <ControlLabel>{value.label}</ControlLabel>
                        <CheckboxGroup
                          name={value.name}
                          onChange={(v) => {
                            setFormValue({
                              ...formValue,
                              [value.name]: v,
                            });
                          }}
                        >
                          {value.inputs.map((optionValue, index) => {
                            return (
                              <>
                                <Checkbox value={optionValue.name}>
                                  {optionValue.label}
                                </Checkbox>
                              </>
                            );
                          })}
                        </CheckboxGroup>
                      </FormGroup>
                    </FlexboxGrid.Item>
                  </>
                );
              case "textarea":
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
                        componentClass="textarea"
                        rows={8}
                        className="input-width"
                        name={value.name}
                        placeholder="Descripción"
                      />
                    </FormGroup>
                  </FlexboxGrid.Item>
                );
              case "money":
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
                      <InputGroup>
                        <FormControl
                          type="number"
                          className="input-width"
                          name={value.name}
                          placeholder={"3.00$"}
                        />
                        <InputGroup.Addon> $</InputGroup.Addon>
                      </InputGroup>
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
                        name={value.name}
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
              md={12}
              sm={24}
              className="form-input"
            >
              <FormGroup>
                <ControlLabel> Ubicación </ControlLabel>
                <Map setCoords={setMap} />
              </FormGroup>
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
