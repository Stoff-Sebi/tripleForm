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
    <form>
      {inputFields.map((input, index) => {
        return (
          <>
            <label>{input.label}</label>
            <input type="text" id={input.id} placeholder={input.placeHolder} value={input.value} onChange={(evt) => {
              inputFields[index].value = evt.currentTarget.value;
              let newInput = [...inputFields]
              return setInputFields ? setInputFields(() => newInput) : null
            }}/>
          </>
        );
      })}
    </form>
  );
};

export default ResponsiveForm;
