import React, { useState, useEffect } from "react";
import {
  Steps,
  Button,
  Form,
  Grid,
  Col,
  Row,
  FlexboxGrid,
  Icon,
  FormGroup,
  ControlLabel,
  FormControl,
  Uploader,
  Schema,
} from "rsuite";
import { SingUpBase } from "./SingUpBase";
import { NavBar } from "../Componentes/navBar";
import { Map } from "../Componentes/Map";
import axios from "axios";
import MaskedInput from "react-text-mask";

// import { SingUpEmprendedor } from "./SingUpEmprendedor";
// import { SingUpUsuarios } from "./SingUpUsuarios";
// import { SingUpDriver } from "./SingUpDriver";
export const SignUp = () => {
  //Schemas
  const { StringType, NumberType, ObjectType } = Schema.Types;

  const empreSchema = Schema.Model({
    file: ObjectType().isRequired("Es necesario que se añada una imagen"),
    nombre: StringType()
      .isRequired("No puede dejar este campo vacio")
      .maxLength(20, "Su nombre no puede exceder los 20 caracteres"),
    apellido: StringType()
      .isRequired("No puede dejar este campo vacio")
      .maxLength(20, "Su apellido no puede exceder los 20 caracteres"),
    email: StringType()
      .isRequired("No puede dejar este campo vacio")
      .isEmail("Debe introducir un correo electronico real"),
    password: StringType()
      .isRequired("No puede dejar este campo vacio")
      .minLength(6, "Su contraseña debe temer mínimo 6 caracteres")
      .maxLength(20, "Su contraseña no puede exceder los 20 caracteres"),
    nEmprendimiento: StringType()
      .isRequired("No puede dejar este campo vacio")
      .maxLength(
        20,
        "El nombre de su emprendimiento no puede exceder los 20 caracteres"
      ),
  });

  const [step, setStep] = useState(0);
  const [data, setData] = useState();
  const [formData, setFormData] = useState();
  const [userFormData, setUserFormData] = useState({});
  const [driverFormData, setDriverFormData] = useState({});
  const [empreFormData, setEmpreFormData] = useState({});
  const onChange = (nextStep) => {
    setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
  };
  const onNext = () => {
    onChange(step + 1);
  };
  const onPrevious = () => onChange(step - 1);
  useEffect(() => {
    if (formData) {
      setFormData({ ...formData, ...data });
    } else {
      setFormData(data);
    }
  }, [data, setData]);

  //Funcion para el submit del form del usuario
  const submitUserForm = (check, vals) => {};
  //Funcion para el submit del form del driver
  const submitDriverForm = (check, vals) => {};
  //Funcion para el submit del form del emprendedor
  const submitEmpreForm = (check, vals) => {};

  return (
    <>
      <NavBar />
      <Steps current={step}>
        <Steps.Item title="Tipo de Usuario" />
        <Steps.Item title="Registro" />
      </Steps>
      {step === 0 && (
        <SingUpBase
          submitFunction={(val) => {
            setData(val);
            onNext();
          }}
        />
      )}
      {/* Formulario de Registro de un Emprendedor */}
      {step === 1 && formData && formData["Tipo de Cliente"] === "Emprendedor" && (
        <>
          <h2>
            <center>Registro Emprendimiento</center>
          </h2>

          <Form
            onChange={(formValue, e) => {
              setEmpreFormData(formValue);
            }}
            onSubmit={(e) => {
              console.log(empreFormData);
            }}
            model={empreSchema}
          >
            <Grid>
              <Row style={{ marginTop: "2rem" }}>
                <Col
                  xs={24}
                  sm={12}
                  componentClass={FlexboxGrid}
                  justify="center"
                  align="middle"
                >
                  <FormGroup>
                    <ControlLabel className="subtitle">
                      Foto de Perfil
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
                        console.log(res);
                        console.log(file);
                      }}
                    >
                      <Button className="input-width">
                        <Icon icon="avatar" size="4x" />
                      </Button>
                    </FormControl>
                  </FormGroup>
                </Col>
                <Col
                  xs={24}
                  sm={12}
                  componentClass={FlexboxGrid}
                  justify="center"
                  align="middle"
                >
                  <FormGroup>
                    <ControlLabel className="subtitle">Nombre</ControlLabel>
                    <FormControl
                      className="input-width"
                      name="nombre"
                      placeholder="Nombre"
                      type="text"
                    ></FormControl>
                  </FormGroup>
                </Col>
              </Row>
              <Row style={{ marginTop: "2rem" }}>
                <Col
                  xs={24}
                  sm={12}
                  componentClass={FlexboxGrid}
                  justify="center"
                  align="middle"
                >
                  <FormGroup>
                    <ControlLabel className="subtitle">Apellido</ControlLabel>
                    <FormControl
                      className="input-width"
                      name="apellido"
                      placeholder="Apellido"
                      type="text"
                    ></FormControl>
                  </FormGroup>
                </Col>
                <Col
                  xs={24}
                  sm={12}
                  componentClass={FlexboxGrid}
                  justify="center"
                  align="middle"
                >
                  <FormGroup>
                    <ControlLabel className="subtitle">E-Mail</ControlLabel>
                    <FormControl
                      className="input-width"
                      name="email"
                      placeholder="E-Mail"
                      type="text"
                    ></FormControl>
                  </FormGroup>
                </Col>
              </Row>
              <Row style={{ marginTop: "2rem" }}>
                <Col
                  xs={24}
                  sm={12}
                  componentClass={FlexboxGrid}
                  justify="center"
                  align="middle"
                >
                  <FormGroup>
                    <ControlLabel className="subtitle">Teléfono</ControlLabel>
                    <FormControl
                      className="input-width"
                      name="telefono"
                      placeholder="Teléfono"
                      accepter={MaskedInput}
                      mask={[
                        "(",
                        /[1-9]/,
                        /\d/,
                        /\d/,
                        ")",
                        " ",
                        /\d/,
                        /\d/,
                        /\d/,
                        "-",
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                      ]}
                    ></FormControl>
                  </FormGroup>
                </Col>
                <Col
                  xs={24}
                  sm={12}
                  componentClass={FlexboxGrid}
                  justify="center"
                  align="middle"
                >
                  <FormGroup>
                    <ControlLabel className="subtitle">Contraseña</ControlLabel>
                    <FormControl
                      className="input-width"
                      name="password"
                      placeholder="Contraseña"
                      type="password"
                    ></FormControl>
                  </FormGroup>
                </Col>
              </Row>
              <Row style={{ marginTop: "2rem" }}>
                <Col
                  xs={24}
                  sm={12}
                  componentClass={FlexboxGrid}
                  justify="center"
                  align="middle"
                >
                  <FormGroup>
                    <ControlLabel className="subtitle">
                      Nombre Emprendimiento
                    </ControlLabel>
                    <FormControl
                      className="input-width"
                      name="nEmprendimiento"
                      placeholder="Avviare"
                      type="text"
                    ></FormControl>
                  </FormGroup>
                </Col>
                <Col
                  xs={24}
                  sm={12}
                  componentClass={FlexboxGrid}
                  justify="center"
                  align="middle"
                >
                  <FormGroup>
                    <ControlLabel className="subtitle">
                      Descripción Emprendimiento
                    </ControlLabel>
                    <FormControl
                      className="input-width"
                      name="dEmprendimiento"
                      placeholder="Aquí inicia un sueño"
                      componentClass="textarea"
                      rows={8}
                    ></FormControl>
                  </FormGroup>
                </Col>
              </Row>
              <Row style={{ marginTop: "2rem" }}>
                <Col
                  xs={24}
                  sm={24}
                  componentClass={FlexboxGrid}
                  justify="center"
                  align="middle"
                  style={{ marginTop: "2rem" }}
                >
                  <Map />
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  style={{ margin: "2rem 0" }}
                  componentClass={FlexboxGrid}
                  justify="center"
                  align="middle"
                >
                  <FormGroup>
                    <Button
                      appearance="primary"
                      color="green"
                      type="submit"
                      className="input-width"
                    >
                      Iniciar Emprendimiento
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            </Grid>
          </Form>
        </>
      )}

      {/* Formulario de Registro de un Usuario */}

      {step === 1 && formData && formData["Tipo de Cliente"] === "Usuario" && (
        <>
          <div className="form-container-title">
            <h1 className="form-title">Registro Cliente</h1>
          </div>
          <Form
            onChange={(e) => {
              setUserFormData(e);
            }}
          >
            <Grid>
              <Row>
                <Col componentClass={FlexboxGrid}></Col>
                <Col componentClass={FlexboxGrid}></Col>
              </Row>
              <Row>
                <Col componentClass={FlexboxGrid}></Col>
                <Col componentClass={FlexboxGrid}></Col>
              </Row>
            </Grid>
          </Form>
        </>
      )}

      {/* Formulario de Registro de un Driver */}

      {step === 1 && formData && formData["Tipo de Cliente"] === "Driver" && (
        <>
          <div className="form-container-title">
            <h1 className="form-title">Registro Driver</h1>
          </div>
          <Form
            onChange={(e) => {
              setDriverFormData(e);
            }}
          >
            <Grid>
              <Row>
                <Col componentClass={FlexboxGrid}></Col>
                <Col componentClass={FlexboxGrid}></Col>
              </Row>
              <Row>
                <Col componentClass={FlexboxGrid}></Col>
                <Col componentClass={FlexboxGrid}></Col>
              </Row>
            </Grid>
          </Form>
        </>
      )}
    </>
  );
};
