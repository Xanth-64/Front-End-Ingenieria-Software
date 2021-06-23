import React from "react";
import { Schema } from "rsuite";
import { FormSesion } from "../Componentes/FormSesion";

export const SignUpUsuarios = ({ SubmitFunction, bFunction, setMap }) => {
  // Schema
  const { StringType, ObjectType } = Schema.Types;
  const labels = [
    {
      label: "Foto de Perfil",
      type: "image",
      name: "imagen_url",
    },
    {
      label: "Nombre",
      type: "text",
      name: "nombre",
    },
    {
      label: "Apellido",
      type: "text",
      name: "apellido",
    },
    {
      label: "Número de Teléfono",
      type: "phone",
      name: "telefono",
    },
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
  const userSchema = Schema.Model({
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
    telefono: StringType()
      .isRequired("No puede dejar este campo vacio")
      .addRule((value) => {
        // Se comprueba que el valor dado sea un numero y no tenga espacios en blanco.
        return !isNaN(value) && !isNaN(parseFloat(value));
      }, "El campo solo debe contener numeros"),
  });
  return (
    <div>
      <FormSesion
        Inputlabels={labels}
        SubmitFunction={SubmitFunction}
        buttonText="Crear Cuenta"
        title="Creación usuario Avviare"
        showMap="T"
        bFunction={bFunction}
        Schema={userSchema}
        setMap={setMap}
      />
    </div>
  );
};
