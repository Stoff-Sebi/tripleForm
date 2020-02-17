import React from "react";

interface inputField {
  label: string;
  value: string;
  type: "text" | "select" | "autocomplete";
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

        //case input field is plain input type == when the value is a plain string.
        if(input.type === "text")
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

        if(input.type === "select")
            return (
              <p>nice</p>
            )
      })}
      <button className="btn btn-secondary" onClick={(evt) => handleSearch(evt)}>Search</button>
    </form>
  );
};

export default ResponsiveForm;
