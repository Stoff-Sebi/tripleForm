import React from "react";
import styles from "./styles.module.css"; //import css module here -> this variable can then be used in classname.
import ResponsiveForm from "../../common/ResponsiveForm";
import ConfigProvier from "../../common/ConfigProvider";
import {QueryInput, QuerySelectInput, SelectValue} from "../../../@types/types";

interface props {
  queryStart?: string;
  parameterDelimiter?: string;
  parameters?: QueryInput[];
  encode?: boolean;
}

const TripleForm: React.FC<props> = ({
  queryStart="https://glossa.uni-graz.at/archive/objects/query:cantus.fulltext/methods/sdef:Query/get?params=", 
  parameterDelimiter = ";", 
  parameters = undefined
}) => {

  //for config linked with ConfigProvider
  const [gamsConfig, setGamsConfig] = React.useState<undefined | any>(undefined);
  //assigned in useEffect -> tripleFormConfig variable.
  const [tripleFormConfig, setTripleFormConfig] = React.useState<undefined | any>(undefined);

  const [query, setQuery] = React.useState<""| string>("");
  const [queryInputs, setInputs] = React.useState<QueryInput[] | undefined>(undefined);

  // initial useEffect to configure component 
  React.useEffect(() => {
    if (!gamsConfig) return;
    if (!gamsConfig.tripleForm){
        console.error("No tripleForm property could've been detected. Make sure to apply configuration inside window._gamsComponentConfig.tripleForm");
        return;
    }
    setTripleFormConfig(gamsConfig.tripleForm);
    setInputs(gamsConfig.tripleForm.formGroups);
  }, [gamsConfig]);

  const handleSearch = (btnClickEvent: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    btnClickEvent.preventDefault(); //prevents default submit action on form.
    if(!query)return alert("wählen Sie einen gültigen Wert für die Suche aus.");
    if(!queryInputs)throw new TypeError("Cannot start a search without any formGroups defined for the tripleForm!");
    let inputErrFlag: boolean = false;
    queryInputs.forEach(queryInput=>{
      if(!queryInput.value){
        inputErrFlag = true;
      }
    })
    if(inputErrFlag)return alert("Bitte wählen Sie für alle Suchfelder einen gültigen Wert aus.");
    let url = queryStart + encodeURIComponent(query);
    window.location.href = url;
  }

  //
  React.useEffect(()=>{
    if(!queryInputs) return;
    let query = "";
    queryInputs.forEach(queryInput => {
      if(query==="undefined")query = "";

      //check which type queryInput has
      if(queryInput.type==="text"){
        query += `${queryInput.parameter}${queryInput.value}${queryInputs.length > 1 ? parameterDelimiter : ''}`;
      }

      //check if type is queryInput or autocomplete
      if((queryInput.type==="select") || (queryInput.type==="autocomplete")) {
        //if array
        if(Array.isArray(queryInput.value)){
          (queryInput.value as SelectValue[]).forEach((inputObj) => {
            //if _selected property set to true
            if(inputObj._selected === true)query += `${queryInput.parameter}${inputObj.value}${queryInputs.length > 1 ? parameterDelimiter : ''}`;
          })
        } else {
          throw new TypeError(`Encountered a not array type inside an queryInput marked as 'select'. Input's label is: ${queryInput.label}`);
        }
      }
    });
    
    if(query==="undefined")return setQuery("");
    setQuery(query)
  }, [queryInputs]);

  return (
    <>
    <ConfigProvier
      windowConfigPropName={"_gamsComponentConfig"}
      setConfig={setGamsConfig}
    ></ConfigProvier>
    { queryInputs ? (<><p>{query}</p>
    <ResponsiveForm
      inputFields={queryInputs}
      setInputFields={setInputs}
      handleSearch={handleSearch}
    ></ResponsiveForm></>) : null}
    </>
  );
};

export default TripleForm;
