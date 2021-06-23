import axios from "axios";
import jwt_decode from "jwt-decode";
import React from "react";
import { FormSesion } from "../Componentes/FormSesion";

export const Login = () => {
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
      console.log("token data", token.data.data[0].split(".")[1]);
      let tokenData = jwt_decode(token.data.data[0].split(".")[1], {
        header: true,
      });
      console.log(tokenData);
    } catch (error) {
      console.log("This is the error", error);
    }
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
