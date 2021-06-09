import React, { useState, useEffect } from "react";
import { Steps, ButtonGroup, Button } from "rsuite";
import { SingUpBase } from "./SingUpBase";
import { NavBar } from "../Componentes/navBar";
import { Map } from "../Componentes/Map";
import { SingUpEmprendedor } from "./SingUpEmprendedor";
import { SingUpUsuarios } from "./SingUpUsuarios";
import { SingUpDriver } from "./SingUpDriver";
export const SignUp = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState();
  const [formData, setFormData] = useState();
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

  return (
    <div>
      <NavBar />
      <Steps current={step}>
        <Steps.Item title="Tipo de Usuario" />
        <Steps.Item title="Registro" />
        <Steps.Item title="Waiting" />
        <Steps.Item title="Waiting" />
      </Steps>
      {step === 0 && (
        <SingUpBase
          submitFunction={(val) => {
            setData(val);
            onNext();
          }}
        />
      )}

      {step === 1 &&
        formData &&
        formData["Tipo de Cliente"] === "Emprendedor" && <SingUpEmprendedor />}
      {step === 1 && formData && formData["Tipo de Cliente"] === "Usuario" && (
        <SingUpUsuarios />
      )}
      {step === 1 && formData && formData["Tipo de Cliente"] === "Driver" && (
        <SingUpDriver />
      )}
      {step === 2 && formData && formData["Tipo de Cliente"] === "Usuario" && (
        <SingUpUsuarios />
      )}

      <ButtonGroup>
        <Button onClick={onPrevious} disabled={step === 0}>
          Previous
        </Button>
        <Button onClick={onNext} color="green" disabled={step === 3}>
          Next
        </Button>
      </ButtonGroup>
    </div>
  );
};
