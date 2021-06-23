import React, { useState, useEffect } from "react";
import { Steps, Button, Schema, Alert, ButtonGroup } from "rsuite";

import axios from "axios";
import jwt_decode from "jwt-decode";

import { SignUpEmprendedor } from "./SignUpEmprendedor";
import { SignUpUsuarios } from "./SignUpUsuarios";
import { SignUpDriver } from "./SignUpDriver";
export const SignUp = () => {
  //Schemas
  const { StringType, ObjectType } = Schema.Types;

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
  const [data, setData] = useState({});
  const [map, setMap] = useState({ enabled: false });
  const [empreFormData, setEmpreFormData] = useState({});
  const onChange = (nextStep) => {
    setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
  };
  const onNext = () => {
    onChange(step + 1);
  };
  const onPrevious = () => onChange(step - 1);
  useEffect(() => {
    console.log("Map changed");
  }, [map, setMap]);
  useEffect(() => {
    Alert.info(
      "Esta aplicación solicitará su localización, la cual es necesaria para completar el proceso de creación de cuenta",
      5000
    );
  }, []);
  const setMapa = (map) => {
    setMap(map);
  };
  const crearCuenta = async () => {
    console.log("se va a crear cuenta", data);
    // Creación de un Usuario sin importar el tipo
    try {
      let token = await axios.post(
        "https://avviare.herokuapp.com/api/auth/signup",
        {
          tipo: data.tipo,
          nombre: data.nombre,
          apellido: data.apellido,
          email: data.email,
          password: data.password,
          imagen_url: data.imagen_url,
          telefono: data.telefono,
        }
      );
      let decodedToken = jwt_decode(token.data.split(".")[1]);
      console.log(decodedToken);
      let address = await axios.post(
        "https://avviare.herokuapp.com/api/address",
        {
          usuarioIdUsuario: token.data.id,
          latitud: data.lat,
          longitud: data.lng,
        }
      );

      switch (data.tipo) {
        case "Emprendedor":
          // Creacion de la empresa del emprendedor
          break;
        case "Driver":
          //Creacion del vehículo del Driver y su empresa
          break;
        default:
          // Creacion del del Usuario
          break;
      }
    } catch (error) {}
  };

  const submitBase = (val) => {
    console.log("Submit signupBase", val);
    setData(val);
    if (val["tipo"]) {
      onNext();
    } else {
      Alert.info("Escoja el tipo de cliente que desea registrar");
    }
  };
  const [sendable, setSendable] = useState(false);
  return (
    <>
      <Steps current={step}>
        <Steps.Item title="Tipo de Usuario" />
        <Steps.Item title="Registro" />
      </Steps>
      {step === 0 && (
        <ButtonGroup>
          <Button
            onClick={() => {
              setData({
                tipo: "Emprendedor",
              });
              onNext();
            }}
          >
            {" "}
            Emprendedor
          </Button>

          <Button
            onClick={() => {
              setData({
                tipo: "Cliente",
              });
              onNext();
            }}
          >
            {" "}
            Cliente
          </Button>
          <Button
            onClick={() => {
              setData({
                tipo: "Driver",
              });
              onNext();
            }}
          >
            Driver{" "}
          </Button>
        </ButtonGroup>
      )}
      {/* Formulario de Registro de un Emprendedor */}
      {step === 1 && data && data["tipo"] === "Emprendedor" && (
        <SignUpEmprendedor
          SubmitFunction={(val) => {
            val["tipo"] = data.tipo;
            console.log("Submit de signUpEmprendedor", val);
            setData(val);
            if (map.enabled) {
              console.log("We can send it");
              console.log(map);
              onNext();
            } else {
              console.log("We cannot send it");
            }
          }}
          bFunction={onPrevious}
          setMap={setMapa}
        />
      )}

      {/* Formulario de Registro de un Usuario */}

      {step === 1 && data && data["tipo"] === "Usuario" && (
        <SignUpUsuarios
          SubmitFunction={(val) => {
            val["tipo"] = data.tipo;
            console.log("Submit de signUpUsuarios", val);
            setData(val);
            if (map.enabled) {
              console.log("We can send it");
              console.log(map);
              onNext();
            } else {
              console.log("We cannot send it");
            }
          }}
          bFunction={onPrevious}
          setMap={setMapa}
        />
      )}

      {/* Formulario de Registro de un Driver */}

      {step === 1 && data && data["tipo"] === "Driver" && (
        <SignUpDriver
          SubmitFunction={(val) => {
            val["tipo"] = data.tipo;
            console.log("Submit de signUpDriver", val);
            setData(val);
            if (map.enabled) {
              console.log("We can send it");
              console.log(map);
              onNext();
            } else {
              console.log("We cannot send it");
            }
          }}
          bFunction={onPrevious}
          setMap={setMapa}
        />
      )}
      {step === 2 && (
        <>
          <h1> Está a punto de crear una cuenta de usuario ¿Está seguro?</h1>
          <Button onClick={crearCuenta}> Crear Cuenta</Button>
        </>
      )}
    </>
  );
};
{
  /* <>
  <h2>
    <center>Registro Emprendimiento</center>
  </h2>

  <Form
    onChange={(formValue, e) => {
      setEmpreFormData(formValue);
    }}
    onSubmit={(e) => {
      if (sendable) {
        console.log(empreFormData);
      } else {
        console.log("no ");
      }
    }}
    onCheck={(formError) => {
      if (Object.keys(formError).length !== 0) {
        setSendable(false);
      } else {
        setSendable(true);
      }
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
            <ControlLabel className="subtitle">Foto de Perfil</ControlLabel>
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
</>; */
}
