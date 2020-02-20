import React from "react";
import SelectFormGroup from "../SelectFormGroup/index";
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
    index: number
  ): JSX.Element | TypeError => {
    if (textInput.type !== "text")
      throw new TypeError(
        `Tried to generate a textInputFormGroup, which type is not set to 'text'. Input with label: ${textInput.label}`
      );
    if (typeof textInput.value !== "string")
      throw new TypeError(
        `You have to pass in a string, when the input type is set to 'text'. Error at input with label: ${textInput.label}`
      );
    return (
      <div key={`responsiveForm_formGroup_${index}`} className="form-group">
        <label>{textInput.label}</label>
        <input
          required={textInput.required}
          className="form-control"
          type="text"
          id={textInput.id}
          placeholder={textInput.placeHolder}
          value={textInput.value}
          onChange={evt => {  
            //assign to intern input fields given value from input field
            inputFieldsIntern[index].value = evt.currentTarget.value;

            //find formgroup belonging to the input
            let formGroupInd: number = restPathGroups[index].formGroups.indexOf(inputFieldsIntern[index]);

            //copy references
            let formGroupCopy = {...restPathGroups[formGroupInd]};
            let formGroupsCopy = [...restPathGroups];

            //assign state to new value to copy
            formGroupsCopy[formGroupInd] = formGroupCopy;
            return setInputFields ? setInputFields(() => formGroupsCopy) : null;
          }}
        />
      </div>
    );
  };

  const generateSelectFormGroup = (
    selectInput: SelectInput,
    inputGroups: Input[],
    formGroupIndex: number
  ): JSX.Element | TypeError => {
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
        onChange={value => onFormGroupChange(value, selectInput, inputGroups,formGroupIndex)}
      />
    );
  };

  const generateAutoCompleteFormGroup = (selectInput: AutcompleteInput, inputGroups: Input[], formGroupIndex: number) => {
    return <Autocomplete
    id={`${Math.random()*1000}`}
    key={`ResponsiveForm_AutoComplete_${inputGroups.indexOf(selectInput)}`}
    autoCompleteOption={selectInput as AutcompleteInput}
    onchange={(value)=>onFormGroupChange(value, selectInput, inputGroups, formGroupIndex)}
    ></Autocomplete>
  }

  const onFormGroupChange = (value: string, selectInput: AutcompleteInput | SelectInput, inputFieldsIntern: Input[], formGroupIndex: number)=>{
      
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
        restPathGroups.map((pathVarGroup, formGroupIndex) => {
          //then over individual linked formgroups = Input type
          return pathVarGroup.formGroups.map((input, index) => {
            if (input.type === "text") {
              return generateTextFormGroup(input as TextInput, pathVarGroup.formGroups, index);
            }
            if (input.type === "select") {
              return generateSelectFormGroup( input as SelectInput, pathVarGroup.formGroups, formGroupIndex);
            }
            if (input.type === "autocomplete") {
              return generateAutoCompleteFormGroup(input as AutcompleteInput, pathVarGroup.formGroups,formGroupIndex);
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
