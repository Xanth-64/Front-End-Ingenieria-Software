import React, { useState, useEffect } from "react";
import { Steps, Button, Alert, ButtonGroup, Modal, FlexboxGrid } from "rsuite";
import { useCookies } from "react-cookie";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";

import { SignUpEmprendedor } from "./SignUpEmprendedor";
import { SignUpUsuarios } from "./SignUpUsuarios";
import { SignUpDriver } from "./SignUpDriver";
export const SignUp = () => {
  const history = useHistory();
  //Schemas
  const [cookie, setCookie] = useCookies(["user"]);
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});
  const [map, setMap] = useState({ enabled: false });
  // Funcion para cambiar el step actual (el componene que se muestra)
  const onChange = (nextStep) => {
    setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
  };
  //avanzar un step
  const onNext = () => {
    onChange(step + 1);
  };
  //retroceder un step
  const onPrevious = () => onChange(step - 1);
  useEffect(() => {}, [map, setMap]);
  //useEffect que alerta al usuario en cuanto entra que se le pedirá su localización actual
  useEffect(() => {
    Alert.info(
      "Esta aplicación solicitará su localización, la cual es necesaria para completar el proceso de creación de cuenta",
      5000
    );
  }, []);
  //función que se le pasa al componente Mapa como parametro
  const setMapa = (map) => {
    setMap(map);
  };
  //Función que genera o actualiza una cookie con los datos del usuario
  function handleCookie(userData) {
    setCookie("user", userData, {
      path: "/",
      sameSite: "lax",
      expires: new Date(userData.exp * 1000),
    });
  }
  //Función para crear una cuenta una vez se validó toda la información
  const crearCuenta = async () => {
    let tokenId;
    try {
      // Creación de un Usuario sin importar el tipo
      let token = await axios.post(
        "https://avviare.herokuapp.com/api/auth/signup",
        {
          tipo: data.tipo,
          nombre: data.nombre,
          apellido: data.apellido,
          email: data.email,
          password: data.password,
          imagen_url: data.imagen_url,
          telefono: parseInt(data.telefono),
        }
      );

      //Decodificar la data obtenida del token
      let tokenData = jwt_decode(token.data.data[0].split(".")[1], {
        header: true,
      });
      tokenId = tokenData.id;
      //Creación de la dirección del usuario
      await axios.post("https://avviare.herokuapp.com/api/address/one", {
        usuarioIdUsuario: tokenData.id,
        latitud: map.lat.toString(),
        longitud: map.lng.toString(),
      });
      switch (data.tipo) {
        case "Emprendedor":
          // Creacion de la empresa del emprendedor
          await axios.post("https://avviare.herokuapp.com/api/empre/one", {
            name_empresa: data.name_empresa,
            verificado: false,
            start_date: new Date(),
            descripcion: data.descripcion,
            usuarioIdUsuario: tokenData.id,
          });
          Alert.success(
            "Cuenta de Emprendedor Creada Exitosamente, ¡Bienvenido!"
          );
          history.push("/");
          break;
        case "Transportista":
          //Creacion del vehículo del Driver y su empresa
          let docUpdate;
          try {
            docUpdate = await axios.put(
              "https://avviare.herokuapp.com/api/empre_drive/some",
              {
                changes: { nombre: data.name_empresa },
                where: { nombre: data.name_empresa },
              }
            );
          } catch (err) {
            docUpdate = { data: { data: [] } };
          }

          let empreId;
          if (docUpdate.data.data.length) {
            empreId = docUpdate.data.data[0].id_empre;
          } else {
            const doc1 = await axios.post(
              "https://avviare.herokuapp.com/api/empre_drive/one",
              {
                nombre: data.name_empresa,
                descripcion: data.descripcion,
                verificado: false,
              }
            );
            empreId = doc1.data.data[0].id_empre;
          }
          if (!data.condiciones) {
            data.condiciones = [];
          }
          const doc2 = await axios.post(
            "https://avviare.herokuapp.com/api/vehicle/one",
            {
              capacidad: data.capacidad,
              condiciones: data.condiciones,
              placa: data.placa,
              modelo: data.modelo,
              marca: data.marca,
            }
          );
          const carroId = doc2.data.data[0].id_vehiculo;
          await axios.post("https://avviare.herokuapp.com/api/drivers/one", {
            tarifa: data.tarifa,
            licencia_picture: data.licencia_picture,
            certi_salud: data.certi_salud,
            usuarioIdUsuario: tokenData.id,
            vehiculoIdVehiculo: carroId,
            empreDriveIdEmpre: empreId,
            active: true,
          });

          Alert.success("Cuenta de Driver Creata Exitosamente, ¡Bienvenido!");
          history.push("/");
          break;
        default:
          // Creacion del del Usuario
          Alert.success("Cuenta de Usuario Creata Exitosamente, ¡Bienvenido!");
          history.push("/");
          break;
      }
      //Se genera una cookie con los datos del usuario
      handleCookie(tokenData);
    } catch (error) {
      Alert.error("Creación de Usuario Fallida");
      if (tokenId) {
        try {
          await axios.delete(
            `https://avviare.herokuapp.com/api/usuarios/one/${tokenId}`
          );
        } catch (err) {}
      }
      setStep(1);
      console.log(error);
    }
  };

  return (
    <>
      <Steps current={step}>
        <Steps.Item title="Tipo de Usuario" />
        <Steps.Item title="Registro" />
        <Steps.Item title="Envío" />
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
                tipo: "Transportista",
              });
              onNext();
            }}
          >
            Transportista{" "}
          </Button>
        </ButtonGroup>
      )}
      {/* Formulario de Registro de un Emprendedor */}
      {step === 1 && data && data["tipo"] === "Emprendedor" && (
        <SignUpEmprendedor
          SubmitFunction={(val) => {
            val["tipo"] = data.tipo;

            setData(val);
            if (map.enabled) {
              onNext();
            } else {
            }
          }}
          bFunction={onPrevious}
          setMap={setMapa}
        />
      )}

      {/* Formulario de Registro de un Usuario */}

      {step === 1 && data && data["tipo"] === "Cliente" && (
        <SignUpUsuarios
          SubmitFunction={(val) => {
            val["tipo"] = data.tipo;

            setData(val);
            if (map.enabled) {
              onNext();
            } else {
            }
          }}
          bFunction={onPrevious}
          setMap={setMapa}
        />
      )}

      {/* Formulario de Registro de un Driver */}

      {step === 1 && data && data["tipo"] === "Transportista" && (
        <SignUpDriver
          SubmitFunction={(val) => {
            val["tipo"] = data.tipo;

            setData(val);
            if (map.enabled) {
              onNext();
            } else {
            }
          }}
          bFunction={onPrevious}
          setMap={setMapa}
        />
      )}
      {step === 2 && (
        <>
          <Modal
            show={step === 2}
            onHide={() => {
              setStep(1);
            }}
          >
            <FlexboxGrid justify="center" align="middle">
              <FlexboxGrid
                justify="center"
                align="middle"
                style={{ width: "100%" }}
              >
                <h6>
                  {" "}
                  Está a punto de crear una cuenta de usuario ¿Está seguro?
                </h6>
              </FlexboxGrid>
              <FlexboxGrid
                justify="center"
                align="middle"
                style={{ width: "100%" }}
              >
                <Button
                  style={{ margin: "1.5rem 0" }}
                  onClick={crearCuenta}
                  appearance="primary"
                  color="green"
                >
                  {" "}
                  Crear Cuenta
                </Button>
              </FlexboxGrid>
            </FlexboxGrid>
          </Modal>
        </>
      )}
    </>
  );
};
