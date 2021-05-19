import React from "react";

function Test() {
  return (
    <div className="form">
      <form action="">
        <div className="form-container-title">
          <h1 className="form-title">Generic Title</h1>
        </div>
        <div className="form-container-questions">
          <div className="form-container-field-number">
            <label htmlFor="number#1">Number Input Label #1</label>
            <input type="number" id="number#1" placeholder="123456" />
          </div>
          <div className="form-container-field-text">
            <label htmlFor="text#1">Text Input Label #1</label>
            <input type="text" id="text#1" placeholder="Hello there" />
          </div>
          <div className="form-container-select-radio">
            <div className="radioCheckGroup">
              <label htmlFor="radio#1">Radio Option #1</label>
              <input type="radio" id="radio#1" name="radiogroup#1" />
            </div>
            <div className="radioCheckGroup">
              <label htmlFor="radio#1">Radio Option #2</label>
              <input type="radio" id="radio#2" name="radiogroup#1" />
            </div>
            <div className="radioCheckGroup">
              <label htmlFor="radio#1">Radio Option #3</label>
              <input type="radio" id="radio#3" name="radiogroup#1" />
            </div>
          </div>
          <div className="form-container-field-number">
            <label htmlFor="number#2">Numeric Input Label #2</label>
            <input type="number" id="number#2" />
          </div>
        </div>
        <div className="form-container-button">
          <button className="form-button">
            <span>Registrarse</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Test;
