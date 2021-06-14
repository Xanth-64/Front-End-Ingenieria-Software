import React, { useState, useEffect } from "react";
import { Steps, ButtonGroup, Button, Alert } from "rsuite";
import { SingUpBase } from "./SingUpBase";
import { NavBar } from "../Componentes/navBar";
import { Map } from "../Componentes/Map";
import { SingUpEmprendedor } from "./SingUpEmprendedor";
import { SingUpUsuarios } from "./SingUpUsuarios";
import { SingUpDriver } from "./SingUpDriver";
import { set } from "react-hook-form";
export const SignUp = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});
  const [formData, setFormData] = useState({});
  const [dataTemplate, setDataTemplate] = useState([]);
  const onChange = (nextStep) => {
    setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
  };
  const onNext = () => {
    onChange(step + 1);
    console.log(formData);
  };
  const onPrevious = () => onChange(step - 1);
  useEffect(() => {
    if (formData) {
      setFormData({ ...formData, ...data });
    } else {
      setFormData(data);
    }
  }, [data, setData]);
  useEffect(() => {
    console.log("Form Data: ", formData);
  }, [formData]);
  const crearUsuario = () => {
    console.log(formData);
  };
  return (
    <div>
      <NavBar />
      <Steps current={step}>
        <Steps.Item title="Tipo de Usuario" />
        <Steps.Item title="Registro" />
        <Steps.Item title="Envío" />
      </Steps>
      {step === 0 && (
        <SingUpBase
          SubmitFunction={(val) => {
            console.log(data);
            console.log("VAAAAAAAAAL ", val);
            setData(val);
            setFormData(val);
            let dataToAppend = dataTemplate;
            dataToAppend.push(val);
            setDataTemplate(dataToAppend);
            onNext();
          }}
        />
      )}

      {step === 1 && formData && formData["Tipo de Cliente"] === "Emprendedor" && (
        <SingUpEmprendedor
          SubmitFunction={(val) => {
            let dataToAppend = dataTemplate;
            dataToAppend.push(val);
            setData(val);
            setDataTemplate(dataToAppend);
            onNext();
          }}
          bFunction={() => {
            onPrevious();
          }}
        />
      )}
      {step === 1 && formData && formData["Tipo de Cliente"] === "Usuario" && (
        <SingUpUsuarios
          SubmitFunction={(val) => {
            let dataToAppend = dataTemplate;
            dataToAppend.push(val);
            setData(val);
            setDataTemplate(dataToAppend);
            onNext();
          }}
          bFunction={() => {
            onPrevious();
          }}
        />
      )}
      {step === 1 && formData && formData["Tipo de Cliente"] === "Driver" && (
        <SingUpDriver
          SubmitFunction={(val) => {
            let dataToAppend = dataTemplate;
            dataToAppend.push(val);
            setData(val);
            setDataTemplate(dataToAppend);
            onNext();
          }}
          bFunction={() => {
            onPrevious();
          }}
        />
      )}
      {step === 2 && (
        <div className="form-container-title">
          <h1 className="form-title"> Ventana de Confirmación </h1>
          <ButtonGroup>
            <Button onClick={onPrevious} disabled={step === 0}>
              Anterior
            </Button>
            <Button onClick={crearUsuario} color="green" disabled={step === 3}>
              Crear Cuenta
            </Button>
          </ButtonGroup>
        </div>
      )}
    </div>
  );
};
