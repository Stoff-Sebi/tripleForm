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
  handleSearch: (btnClickEvent: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ResponsiveForm: React.FC<Props> = ({ inputFields, setInputFields, handleSearch }) => {
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
      <button className="btn btn-secondary" onClick={(evt) => handleSearch(evt)}>Search</button>
    </form>
  );
};

export default ResponsiveForm;
