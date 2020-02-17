import React from "react";

interface inputField {
  label: string;
  value: string;
  id: string;
  placeHolder?: string;
  
}

interface Props {
  inputFields: inputField[];
  setInputFields?: Function;
}

const ResponsiveForm: React.FC<Props> = ({ inputFields, setInputFields }) => {
  return (
    <form id="responsiveForm">
      {inputFields.map((input, index) => {
        return (
          <div className="form-group">
            <label>{input.label}</label>
            <input className="form-control" type="text" id={input.id} placeholder={input.placeHolder} value={input.value} onChange={(evt) => {
              inputFields[index].value = evt.currentTarget.value;
              let newInput = [...inputFields]
              return setInputFields ? setInputFields(() => newInput) : null
            }}/>
          </div>
        );
      })}
    </form>
  );
};

export default ResponsiveForm;
