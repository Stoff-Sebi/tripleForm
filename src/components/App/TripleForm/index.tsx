import React from "react";
import styles from "./styles.module.css"; //import css module here -> this variable can then be used in classname.
import ResponsiveForm from "../../common/ResponsiveForm"

interface QueryInputField {
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
  parameters?: QueryInputField[];
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
},
{
  label:"test05",
  value:[{label:"Vierzehn", value:"14", _selected:true},{label:"Hupfburg", value:"Hupfburg", _selected:false}, ],
  type: "select",
  id:"1233333as",
  placeHolder:"bimbiasdds",
  RESTParameter: "$9|"
}

]}) => {

  const [query, setQuery] = React.useState<""| string>("");
  const [queryInputFields, setInputs] = React.useState<QueryInputField[]>(parameters);

  const handleSearch = (btnClickEvent: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    btnClickEvent.preventDefault(); //prevents default submit action on form.
    if(!query)return alert("wählen Sie einen gültigen Wert für die Suche aus.");
    let inputErrFlag: boolean = false;
    queryInputFields.forEach(queryInput=>{
      if(!queryInput.value){
        inputErrFlag = true;
      }
    })
    if(inputErrFlag)return alert("Bitte wählen Sie für alle Suchfelder einen gültigen Wert aus.");
    let url = queryStart + encodeURIComponent(query);
    window.location.href = url;
  }

  React.useEffect(()=>{
    console.log(queryInputFields);
    if(!queryInputFields) return;
    console.log("Inputs changed!", queryInputFields);

    let query = "";
    queryInputFields.forEach(queryInput => {
      if(query==="undefined")query = "";

      //check which type queryInput has
      if(queryInput.type==="text"){
        query += `${queryInput.RESTParameter}${queryInput.value}${queryInputFields.length > 1 ? parameterDelimiter : ''}`;
      }

      //check if type is queryInput
      if(queryInput.type==="select"){
        //if array
        if(Array.isArray(queryInput.value)){ 
          (queryInput.value as {label:string, value: string, _selected?: boolean}[]).forEach((inputObj) => {
            //if _selected property set to true
            if(inputObj._selected === true)query += `${queryInput.RESTParameter}${inputObj.value}${queryInputFields.length > 1 ? parameterDelimiter : ''}`;
          })
        } else {
          throw new TypeError(`Encountered a not array type inside an queryInput marked as 'select'. Input's label is: ${queryInput.label}`);
        }
      }
      
    });
    
    if(query==="undefined")return setQuery("");
    setQuery(query)
  }, [queryInputFields]);

  return (
    <>
    <p>{query}</p>
    <ResponsiveForm
      inputFields={queryInputFields}
      setInputFields={setInputs}
      handleSearch={handleSearch}
    ></ResponsiveForm>
    </>
  );
};

export default TripleForm;
