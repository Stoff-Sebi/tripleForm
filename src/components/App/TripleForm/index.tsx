import React from "react";
import ResponsiveForm from "../../common/ResponsiveForm";
import QueryBuilder from "../QueryBuilder"
import ConfigProvier from "../../common/ConfigProvider";
import {
  QueryInput,
  SelectValue,
  TripleForm,
  RestPathVariableGroup
} from "../../../@types/types";

interface props {
  queryStart?: string;
  parameterDelimiter?: string;
  parameters?: QueryInput[];
  encode?: boolean;
}

const TripleFormReact: React.FC<props> = ({
  queryStart = undefined,
  parameterDelimiter = undefined,
  parameters = undefined
}) => {
  //for config linked with ConfigProvider
  const [gamsConfig, setGamsConfig] = React.useState<undefined | any>(
    undefined
  );
  //assigned in useEffect -> tripleFormConfig variable.
  const [tripleFormConfig, setTripleFormConfig] = React.useState<
    TripleForm | any
  >(undefined);

  const [query, setQuery] = React.useState<"" | string>("");
  const [queryInputs, setInputs] = React.useState<
    RestPathVariableGroup[] | undefined
  >(undefined);

  const [inputIsValid, setInputIsValid] = React.useState<boolean | undefined>(
    undefined
  );
  const [loading, setLoading] = React.useState<boolean>(false);

  // initial useEffect to configure component
  React.useEffect(() => {
    if (!gamsConfig) return;
    if (!gamsConfig.tripleForm) {
      console.error(
        "No tripleForm property could've been detected. Make sure to apply configuration inside window._gamsComponentConfig.tripleForm"
      );
      return;
    }
    setTripleFormConfig(gamsConfig.tripleForm);
    
    //local storage handling
    let localQueryInputs = localStorage.getItem('tripleForm');
    /* if(localQueryInputs){
      setInputs(JSON.parse(localQueryInputs));
    } else {
      setInputs(gamsConfig.tripleForm.properties);
    }; */
    setInputs(gamsConfig.tripleForm.properties);
  }, [gamsConfig]);

  //Use Effect build the query as url string
  React.useEffect(() => {
    if (!queryInputs) return;
    let query = "";

    //if paramDelimiter is set via props take that otherwise take setting in tripleFormConfig
    let paramDelimiter = parameterDelimiter
      ? parameterDelimiter
      : tripleFormConfig.parameterDelimiter;

    queryInputs.forEach(restVargroup => {
      if (query.includes(restVargroup.restPathVariable))
        throw new TypeError(
          `Found RestPathVariable a second time: ${restVargroup.restPathVariable}`
        );
      if (query === "undefined" || !query) {
        query = `${restVargroup.restPathVariable}=`;
      } else {
        query += `&${restVargroup.restPathVariable}=`;
      }

      restVargroup.formGroups.forEach((queryInput, inputObjIndex) => {
        //check which type queryInput has
        if (queryInput.type === "text") {
          query += `${inputObjIndex === 0 ? "" : paramDelimiter}${
            queryInput.parameter
          }${queryInput.value}`;
        }

        //check if type is queryInput or autocomplete
        if (
          queryInput.type === "select" ||
          queryInput.type === "autocomplete"
        ) {
          //if array
          if (Array.isArray(queryInput.value)) {
            (queryInput.value as SelectValue[]).forEach(inputObj => {
              //if _selected property set to true
              if (inputObj._selected === true) {
                query += `${inputObjIndex === 0 ? "" : paramDelimiter}${
                  queryInput.parameter
                }${inputObj.value}`;
              }
            });
          } else {
            throw new TypeError(
              `Encountered a not array type inside an queryInput marked as 'select'. Input's label is: ${queryInput.label}`
            );
          }
        }
      });
    });
    if (query === "undefined") return setQuery("");
    setQuery(query);
  }, [queryInputs]);

  //sets the local storage whenever the input changes.
  React.useEffect(()=>{
    if(!queryInputs)return;
    localStorage.setItem('tripleForm', JSON.stringify(queryInputs));
  }, [queryInputs]);

  //validates when query changes.
  //sets inputIsValid state to true | false.
  React.useEffect(() => {
    if (!queryInputs) return;
    try {
      queryInputs.forEach(restPathGroup => {
        restPathGroup.formGroups.forEach(formGroup => {
          if (!formGroup.value && formGroup.required) throw new TypeError();
          if (Array.isArray(formGroup.value) && formGroup.required) {
            let oneIsTrue = false;
            formGroup.value.forEach(input => {
              if (input._selected === true) oneIsTrue = true;
            });
            if (!oneIsTrue) throw new TypeError();
          }
        });
      });
      setInputIsValid(true);
    } catch (e) {
      setInputIsValid(false);
    }
  }, [query]);

  const handleSearch = (
    btnClickEvent: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    btnClickEvent.preventDefault(); //prevents default submit action on form.
    if (!query)
      return alert("wählen Sie einen gültigen Wert für die Suche aus.");
    if (!queryInputs)
      throw new TypeError(
        "Cannot start a search without any formGroups defined for the tripleForm!"
      );
    if (!inputIsValid)
      return alert(
        "Bitte wählen Sie für alle Suchfelder einen gültigen Wert aus."
      );

    //last navigate to page
    let url = (queryStart ? queryStart : tripleFormConfig.queryStart) + query;
    setLoading(true);
    window.location.href = encodeURI(url);
  };

  return (
    <div className="tripleform">
      <ConfigProvier
        windowConfigPropName={"_gamsComponentConfig"}
        setConfig={setGamsConfig}
        configUrl={undefined}
      ></ConfigProvier>
      {queryInputs ? (
        <>
          <ResponsiveForm
            restPathGroups={queryInputs}
            setInputFields={setInputs}
            handleSearch={handleSearch}
            inputIsValid={inputIsValid}
            loading={loading}
          ></ResponsiveForm>
          {/**
           * Display help to construct query via the query builder.
           * see TripleForm type -> only displayed when lifecycle set to develop
           */}
          {(tripleFormConfig.lifecycle === "develop") ? (
            <QueryBuilder query={query} queryStart={ queryStart ? queryStart : tripleFormConfig.queryStart} paramDelimiter={parameterDelimiter ? parameterDelimiter : tripleFormConfig.parameterDelimiter}/>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default TripleFormReact;
