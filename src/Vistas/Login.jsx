import axios from "axios";
import jwt_decode from "jwt-decode";
import React from "react";
import { FormSesion } from "../Componentes/FormSesion";
import { useCookies } from "react-cookie";
export const Login = () => {
  const [cookie, setCookie] = useCookies(["user"]);
  const labels = [
    {
      label: "Correo",
      type: "email",
      name: "email",
    },
    {
      label: "Contraseña",
      type: "password",
      name: "password",
    },
  ];
  async function submit(data) {
    try {
      console.log("data", data);
      let token = await axios.post(
        "https://avviare.herokuapp.com/api/auth/login",
        data
      );
      let tokenData = jwt_decode(token.data.data[0].split(".")[1], {
        header: true,
      });
      //Genera una cookie
      handleCookie(tokenData);
    } catch (error) {
      console.log("This is the error", error);
    }
  }
  //Función que genera o actualiza una cookie con los datos del usuario
  function handleCookie(userData) {
    setCookie("user", userData, {
      path: "/",
      sameSite: "lax",
      expires: new Date(userData.exp * 1000),
    });
  }
  return (
    <>
      <FormSesion
        Inputlabels={labels}
        SubmitFunction={submit}
        buttonText="Iniciar Sesión"
        title="Login"
      />
    </>
  );
};
