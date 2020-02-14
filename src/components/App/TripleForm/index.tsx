import React from "react";
import styles from "./styles.module.css"; //import css module here -> this variable can then be used in classname.
import ResponsiveForm from "../../common/ResponsiveForm"

interface SearchParameter {
  label: string,
  RESTParameter: string,
}

interface props {
  parameterDelimiter?: string
  parameters?: SearchParameter[]
}

const TripleForm: React.FC<props> = ({parameterDelimiter, parameters}) => {
  return (
    <ResponsiveForm
      inputFields={[{label:"test", id:"123", placeHolder:"test-placeholder"}]}
    ></ResponsiveForm>
  );
};

export default TripleForm;
