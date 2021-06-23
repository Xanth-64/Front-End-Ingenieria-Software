import React from "react";
import { Schema } from "rsuite";
import { FormSesion } from "../Componentes/FormSesion";

export const SignUpDriver = ({ SubmitFunction, bFunction, setMap }) => {
  //Schema
  const { StringType, NumberType, ObjectType } = Schema.Types;
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
      label: "Empresa Asociada",
      type: "text",
      name: "name_empresa",
    },
    {
      label: "Capacidad del Transporte",
      name: "capacidad",
      inputs: [
        { label: "Ligero", name: "ligero" },
        { label: "Mediano", name: "mediano" },
        { label: "Pesado", name: "pesado" },
        { label: "Muy Pesado", name: "muy pesado" },
      ],
      type: "radio",
    },
    {
      label: "Tipo de Carga",
      name: "condiciones",
      inputs: [
        { label: "Fragil", name: "fragile" },
        { label: "Refrigerado", name: "refrigerado" },
        { label: "Liquido", name: "liquido" },
      ],
      type: "multiple select",
    },
    // Acá falta carga de imágen + Ubicación
  ];
  const driverSchema = Schema.Model({
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
        buttonText="Siguiente"
        title="Creación Driver"
        showMap="T"
        bFunction={bFunction}
        Schema={driverSchema}
        setMap={setMap}
      />
    </div>
  );
};