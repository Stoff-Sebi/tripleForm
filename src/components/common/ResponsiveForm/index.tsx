import React from "react";

interface inputField {
  label: string;
  id: string;
  placeHolder?: string;
  setValue?: (val: string) => void;
}

interface Props {
  inputFields: inputField[];
}

const ResponsiveForm: React.FC<Props> = ({ inputFields }) => {
  return (
    <form>
      {inputFields.map(input => {
        return (
          <>
            <label>{input.label}</label>
            <input type="text" id={input.id} placeholder={input.placeHolder} />
          </>
        );
      })}
    </form>
  );
};

export default ResponsiveForm;
