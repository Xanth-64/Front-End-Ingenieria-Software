import axios from "axios";
import jwt_decode from "jwt-decode";
import React from "react";
import { FormSesion } from "../Componentes/FormSesion";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom"; 
import { Alert } from "rsuite";
export const Login = () => {
  const [cookie, setCookie] = useCookies("user");
  const history = useHistory();
    
    //Función que genera o actualiza una cookie con los datos del usuario
    function handleCookie(userData) {
      setCookie("user", userData, {
        path: "/",
        sameSite: "lax",
        expires: new Date(userData.exp * 1000),
      });
      history.push("/")
    }
  
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
      Alert.error("Ha ocurrido un error en la autenticación");
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
