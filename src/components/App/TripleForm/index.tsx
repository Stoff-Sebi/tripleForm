import React from "react";
import styles from "./styles.module.css"; //import css module here -> this variable can then be used in classname.
import ResponsiveForm from "../../common/ResponsiveForm"

interface SearchParameter {
  label: string,
  value: string,
  id: string;
  placeHolder?: string;
  RESTParameter?: string
}

interface props {
  queryStart?: string;
  parameterDelimiter?: string;
  parameters?: SearchParameter[];
  encode?: boolean;
}

const TripleForm: React.FC<props> = ({queryStart, parameterDelimiter = ";", parameters = [{
  label: "test01",
  value:"",
  id:"123",
  placeHolder:"hahatest",
  RESTParameter: "$1|"
},
{
  label:"test02",
  value:"bla",
  id:"123",
  placeHolder:"bimbi",
  RESTParameter: "$2|"
},
{
  label:"test03",
  value:"blasdas",
  id:"1233333",
  placeHolder:"bimbiasdds",
  RESTParameter: "$3|"
},

]}) => {

  const [query, setQuery] = React.useState<""| string>("");
  const [inputs, setInputs] = React.useState<SearchParameter[]>(parameters);

  React.useEffect(()=>{
    if(!inputs) return;
    console.log("Inputs changed!", inputs);

    let query = "";
    query += queryStart;
    inputs.forEach(input => {
      if(query==="undefined")query = "";
      query += `${input.RESTParameter}${input.value}${parameterDelimiter}`;
    });
    
    if(query==="undefined")return setQuery("");
    setQuery(query)
  }, [inputs]);

  return (
    <>
    <p>{query}</p>
    <ResponsiveForm
      inputFields={inputs}
      setInputFields={setInputs}
    ></ResponsiveForm>
    </>
  );
};

export default TripleForm;
