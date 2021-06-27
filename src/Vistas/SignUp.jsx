import React, { useState, useEffect } from "react";
import { Steps, Button, Schema, Alert, ButtonGroup } from "rsuite";
import { useCookies } from "react-cookie";
import axios from "axios";
import jwt_decode from "jwt-decode";

import { SignUpEmprendedor } from "./SignUpEmprendedor";
import { SignUpUsuarios } from "./SignUpUsuarios";
import { SignUpDriver } from "./SignUpDriver";
export const SignUp = () => {
  //Schemas
  const { StringType, ObjectType } = Schema.Types;
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
  useEffect(() => {
    console.log("Map changed");
  }, [map, setMap]);
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
    console.log("cookie.user", userData);
    setCookie("user", userData, {
      path: "/",
      sameSite: "lax",
      expires: new Date(userData.exp * 1000),
    });
  }
  //Función para crear una cuenta una vez se validó toda la información
  const crearCuenta = async () => {
    console.log("se va a crear cuenta", data);
    console.log(new Date());
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
      //Se genera una cookie con los datos del usuario
      handleCookie(tokenData);
      //Creación de la dirección del usuario
      let address = await axios.post(
        "https://avviare.herokuapp.com/api/address/one",
        {
          usuarioIdUsuario: tokenData.id,
          latitud: map.lat.toString(),
          longitud: map.lng.toString(),
        }
      );
      console.log("address created");
      switch (data.tipo) {
        case "Emprendedor":
          // Creacion de la empresa del emprendedor
          let emprendimiento = await axios.post(
            "https://avviare.herokuapp.com/api/empre/one",
            {
              name_empresa: data.name_empresa,
              verificado: false,
              start_date: new Date(),
              descripcion: data.descripcion,
              usuarioIdUsuario: tokenData.id,
            }
          );
          Alert.success(
            "Cuenta de Emprendedor Creata Exitosamente, ¡Bienvenido!"
          );
          break;
        case "Transportista":
          //Creacion del vehículo del Driver y su empresa
          let empresa_drivers = await axios.post(
            "https://avviare.herokuapp.com/api/empre_drive/one",
            {
              nombre: data.name_empresa,
              descripcion: data.descripcion,
              verificado: false,
            }
          );
          if (!data.condiciones) {
            data.condiciones = [];
          }
          let vehiculo = await axios.post(
            "https://avviare.herokuapp.com/api/vehicle/one",
            {
              capacidad: data.capacidad,
              condiciones: data.condiciones,
              placa: data.placa,
              modelo: data.modelo,
              marca: data.marca,
            }
          );
          Alert.success("Cuenta de Driver Creata Exitosamente, ¡Bienvenido!");
          break;
        default:
          // Creacion del del Usuario
          Alert.success("Cuenta de Usuario Creata Exitosamente, ¡Bienvenido!");
          break;
      }
    } catch (error) {
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
            console.log("Submit de signUpEmprendedor", val);
            setData(val);
            if (map.enabled) {
              console.log(map);
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
            console.log("Submit de signUpUsuarios", val);
            setData(val);
            if (map.enabled) {
              console.log(map);
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
            console.log("Submit de signUpDriver", val);
            setData(val);
            if (map.enabled) {
              console.log(map);
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
          <h1> Está a punto de crear una cuenta de usuario ¿Está seguro?</h1>
          <Button onClick={crearCuenta}> Crear Cuenta</Button>
          {cookie.user && <h1>Usuario {cookie.user.email} creado</h1>}
        </>
      )}
    </>
  );
};
