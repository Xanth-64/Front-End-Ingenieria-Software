import React from "react";
import { useForm } from "react-hook-form";
export const FormSesion = ({
  SubmitFunction, //funcion de enviar
  Inputlabels, //Descripcion de los Input
  buttonText, // Texto del Boton
  title, //Titulo del Formulario
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  return (
    <div className="form">
      <form onSubmit={handleSubmit(SubmitFunction)}>
        <div className="form-container-title">
          <h1 className="form-title">{title}</h1>
        </div>
        <div className="form-container-questions">
          {Inputlabels.map((value, index) => {
            let style = `form-container-field-${value.label}`;
            switch (value.type) {
              case "radio":
                return (
                  <>
                    <div className="form-container-select-radio">
                      <h1 className="radioCheckGroupTitle">{value.label}</h1>
                      {value.inputs.map((optionValue, index) => {
                        return (
                          <div className="radioCheckGroup">
                            <label
                              htmlFor={`${value.label}${optionValue.label}`}
                            >
                              {optionValue.label}
                            </label>
                            <input
                              type={value.type}
                              name={value.label}
                              id={`${value.label}${optionValue.label}`}
                            />
                          </div>
                        );
                      })}
                    </div>
                    {errors[value.label] && <span>This field is required</span>}
                  </>
                );
              default:
                return (
                  <>
                    <div className={style}>
                      <input
                        type={value.type}
                        name={value.label}
                        placeholder={value.label}
                        {...register(value.label, value.limits)}
                      />
                    </div>
                    {errors[value.label] && <span>This field is required</span>}
                  </>
                );
            }
          })}
        </div>
        <div className="form-container-button">
          <button type="submit" className="form-button">
            {" "}
            <span>{buttonText} </span>
          </button>
        </div>
      </form>
    </div>
  );
};
