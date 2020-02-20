import React from "react";
import SelectFormGroup from "../SelectFormGroup/index";
import TextFormGroup from "../TextFormGroup";
import { Input, SelectInput, TextInput, AutcompleteInput, RestPathVariableGroup, SelectValue } from "../../../@types/types";
import Autocomplete from "../Autocomplete"
import zimUtils from "../../../utils/utils"

interface Props {
  restPathGroups: RestPathVariableGroup[];
  setInputFields?: Function;
  handleSearch: (
    btnClickEvent: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

const ResponsiveForm: React.FC<Props> = ({
  restPathGroups,
  setInputFields,
  handleSearch
}) => {
  const generateTextFormGroup = (
    textInput: TextInput,
    inputFieldsIntern: Input[],
  ): JSX.Element | TypeError => { 
    return (
      <TextFormGroup
        key={`responsiveForm_formGroup_${inputFieldsIntern.indexOf(textInput)}`}
        options={textInput}
        onChange={value => onFormGroupChange(value, textInput)}
      ></TextFormGroup>
    );
  };

  const generateSelectFormGroup = (
    selectInput: SelectInput,
    inputGroups: Input[]
  ): JSX.Element | TypeError => {
    //first runtime validation
    if (typeof selectInput.value !== "object")
      throw new TypeError(
        `You have to pass in an array of objects if selected type of input is 'select'. Given input-label: ${selectInput.label}`
      );
    if (!Array.isArray(selectInput.value))
      throw new TypeError(
        `You have to pass in an array of objects if selected type of input is 'select'. Given input-label: ${selectInput.label}`
      );
    if (!selectInput.value[0].label || !selectInput.value[0].value)
      throw new TypeError(
        `You have to pass in an array of objects if selected type of input is 'select'. Given input-label: ${selectInput.label}`
      );
    return (
      <SelectFormGroup
        key={`ResponsiveForm_SelectFormGroup_${inputGroups.indexOf(selectInput)}`}
        options={selectInput}
        onChange={value => onFormGroupChange(value, selectInput)}
      />
    );
  };

  const generateAutoCompleteFormGroup = (selectInput: AutcompleteInput, inputGroups: Input[]) => {
    return <Autocomplete
    id={`${Math.random()*1000}`}
    key={`ResponsiveForm_AutoComplete_${inputGroups.indexOf(selectInput)}`}
    autoCompleteOption={selectInput as AutcompleteInput}
    onchange={(value)=>onFormGroupChange(value, selectInput)}
    ></Autocomplete>
  }

  const onFormGroupChange = (value: string, selectInput: AutcompleteInput | SelectInput | TextInput) => {
      //when the type is text input need different procedure
      if(selectInput.type ==="text"){
        //assign to intern input fields given value from input field
        selectInput.value = value;
        let formGroupsCopy = zimUtils.copyDeep(restPathGroups);  //generates a deep copy of state
        return setInputFields ? setInputFields(() => formGroupsCopy) : null;
      }

      //case type is 'autocomplete' or 'select'
      
      //sets the _selected property to true from element linked
      //and others to false.
      let valueObjects: SelectValue[] = [...selectInput.value];
      valueObjects.forEach(select => select._selected = (select.value === value));
      
      //copy then set state (for resetting state errors`?)
      let formGroupsCopy = zimUtils.copyDeep(restPathGroups);  //generates a deep copy of state 
      return setInputFields ? setInputFields(() => formGroupsCopy) : null;
}

  return (
    //generate form with adequate defined form-groups.
    <form id="responsiveForm" className="was-validated">
      {
        //first iterate over different pathVarGroups
        restPathGroups.map(pathVarGroup => {
          //then over individual linked formgroups = Input type
          return pathVarGroup.formGroups.map((input, index) => {
            if (input.type === "text") {
              return generateTextFormGroup(input as TextInput, pathVarGroup.formGroups);
            }
            if (input.type === "select") {
              return generateSelectFormGroup( input as SelectInput, pathVarGroup.formGroups);
            }
            if (input.type === "autocomplete") {
              return generateAutoCompleteFormGroup(input as AutcompleteInput, pathVarGroup.formGroups);
            }
          })
        })
      }
      <button className="btn btn-secondary" onClick={evt => handleSearch(evt)}>
        Search
      </button>
    </form>
  );
};

export default ResponsiveForm;
