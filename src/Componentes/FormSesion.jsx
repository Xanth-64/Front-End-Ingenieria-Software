import React from "react";
import { useForm } from "react-hook-form";
export const FormSesion = ({ SubmitFunction, Inputlabels, buttonText }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  console.log(errors);
  return (
    <div>
      <form onSubmit={handleSubmit(SubmitFunction)}>
        {Inputlabels.map((value, index) => {
          if (true) {
          }
          return (
            <>
              <input
                className="form-input"
                type={value.type}
                name={value.label}
                {...register(value.label, { required: value.required })}
              />
              {errors[value.label] && <span>This field is required</span>}
            </>
          );
        })}
        <button type="submit"> {buttonText} </button>
      </form>
    </div>
  );
};
