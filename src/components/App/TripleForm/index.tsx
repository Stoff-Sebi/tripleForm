import React from "react";
import styles from "./styles.module.css"; //import css module here -> this variable can then be used in classname.
import ResponsiveForm from "../../common/ResponsiveForm"

interface SearchParameter {
  label: string,
  value: string | {label:string, value: string, _selected?: boolean}[],
  type: "text" | "select" | "autocomplete",
  id: string;
  placeHolder?: string;
  RESTParameter?: string;
}

interface props {
  queryStart?: string;
  parameterDelimiter?: string;
  parameters?: SearchParameter[];
  encode?: boolean;
}

const TripleForm: React.FC<props> = ({queryStart="https://glossa.uni-graz.at/archive/objects/query:cantus.fulltext/methods/sdef:Query/get?params=", parameterDelimiter = ";", parameters = [{
  label: "Cantus Volltextsuche",
  value:"",
  type: "text",
  id:"cantus_01_test",
  placeHolder:"z.b. Salzburg",
  RESTParameter: "$5|"
},
{
  label:"test02",
  value:"bla",
  type: "text",
  id:"123",
  placeHolder:"bimbi",
  RESTParameter: "$2|"
},
{
  label:"test03",
  value:"blasdas",
  type: "text",
  id:"1233333sssss",
  placeHolder:"bimbiasdds",
  RESTParameter: "$3|"
},
{
  label:"test04",
  value:[{label:"firstVal", value:"1", _selected:true},{label:"secondVal", value:"2", _selected:false}, ],
  type: "select",
  id:"1233333as",
  placeHolder:"bimbiasdds",
  RESTParameter: "$8|"
}

]}) => {

  const [query, setQuery] = React.useState<""| string>("");
  const [inputs, setInputs] = React.useState<SearchParameter[]>(parameters);

  const handleSearch = (btnClickEvent: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    btnClickEvent.preventDefault(); //prevents default submit action on form.
    if(!query)return alert("wählen Sie einen gültigen Wert für die Suche aus.");
    let inputErrFlag: boolean = false;
    inputs.forEach(input=>{
      if(!input.value){
        inputErrFlag = true;
      }
    })
    if(inputErrFlag)return alert("Bitte wählen Sie für alle Suchfelder einen gültigen Wert aus.");
    let url = queryStart + encodeURIComponent(query);
    window.location.href = url;
  }

  React.useEffect(()=>{
    console.log(inputs);
    if(!inputs) return;
    console.log("Inputs changed!", inputs);

    let query = "";
    inputs.forEach(input => {
      if(query==="undefined")query = "";

      //check which type input has
      if(input.type==="text"){
        query += `${input.RESTParameter}${input.value}${inputs.length > 1 ? parameterDelimiter : ''}`;
      }

      if(input.type==="select"){
        //@ts-ignore
        //query += `${input.RESTParameter}${input.value[0].value}`
      }
      
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
      handleSearch={handleSearch}
    ></ResponsiveForm>
    </>
  );
};

export default TripleForm;
