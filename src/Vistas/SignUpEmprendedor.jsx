import React, { useState } from "react";
import { FormSesion } from "../Componentes/FormSesion";
import { Schema } from "rsuite";
export const SignUpEmprendedor = ({ SubmitFunction, bFunction, setMap }) => {
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
      label: "Correo",
      type: "email",
      name: "email",
    },
    {
      label: "Número de Teléfono",
      type: "phone",
      name: "telefono",
    },
    {
      label: "Contraseña",
      type: "password",
      name: "password",
    },
    {
      label: "Confirmar Contraseña",
      type: "password",
      name: "confirm password",
    },
    {
      label: "Nombre del Emprendimiento",
      type: "text",
      name: "name_empresa",
    },
    {
      label: "Descripcion del Emprendimiento",
      type: "textarea",
      name: "descripcion",
    },
  ];
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
    telefono: StringType()
      .isRequired("No puede dejar este campo vacio")
      .addRule((value) => {
        // Se comprueba que el valor dado sea un numero y no tenga espacios en blanco.
        return !isNaN(value) && !isNaN(parseFloat(value));
      }, "El campo solo debe contener numeros"),
    password: StringType()
      .isRequired("No puede dejar este campo vacio")
      .minLength(6, "Su contraseña debe temer mínimo 6 caracteres")
      .maxLength(20, "Su contraseña no puede exceder los 20 caracteres"),
    name_empresa: StringType()
      .isRequired("No puede dejar este campo vacio")
      .maxLength(
        20,
        "El nombre de su emprendimiento no puede exceder los 20 caracteres"
      ),
  });
  return (
    <div>
      <FormSesion
        Inputlabels={labels}
        SubmitFunction={SubmitFunction}
        onChange={SubmitFunction}
        buttonText="Crear Cuenta Emprendedor"
        title="Creación Emprendedor"
        showMap="T"
        bFunction={bFunction}
        Schema={empreSchema}
        setMap={setMap}
      />
    </div>
  );
};
