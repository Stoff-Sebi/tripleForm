import React from "react";
import Autosuggest from "react-autosuggest";
import { AutcompleteInput } from "../../../@types/types";
import LocalStorageApplier from "../LocalStorageApplier"

interface Props {
  id: string;
  autoCompleteOption: AutcompleteInput;
  onchange: (evt: any) => void;
  localStorageKey: string;
}

const AutoComplete: React.FC<Props> = ({
  id,
  autoCompleteOption,
  onchange,
  localStorageKey,
}) => {
  const [value, setValue] = React.useState<string>(()=>{
    let filtered = autoCompleteOption.value.filter(val=>(val._selected===true));
      return filtered.length > 0 ? filtered[0].label as string : "";
  });

  const [typedIn, setTypedIn] = React.useState<string>(value);

  //needs to be let because getter has to be set!
  let [suggestions, setSuggestions] = React.useState<string[]>([]);

  const getSuggestions = (typedValue: string) => {
    setTypedIn(typedValue); // sets a state where typed in value is stored.
    
    //sets the input to empty when clicked on
    if(typedValue===value){
      onchange(undefined);  //resect selection for "component above";
      setValue("");         //clear input
    };

    const inputValue = typedValue.trim().toLowerCase();
    const inputLength = inputValue.length;
    if(typedValue==="*")return autoCompleteOption.value;
    return inputLength === 0
      ? []
      : autoCompleteOption.value.filter(
          lang => lang.label ? (lang.label.toLowerCase().slice(0, inputLength) === inputValue) : undefined
        );
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  const getSuggestionValue = (suggestion: any) => {
    return suggestion.label;
  };

  // Use your imagination to render suggestions.
  const renderSuggestion = (suggestion: any) => {
    let typedInLength = typedIn.length;
    return (
      <div>
        <span style={{ color: "red" }}>{suggestion.label.substring(0,typedInLength)}</span>
        <span>{suggestion.label.substring(typedInLength, suggestion.label.length)}</span>
      </div>
    );
  };

  const onChange = (event: any, { newValue }: any) => {
    setValue(newValue);
  };

  React.useEffect(() => { 
    if (!value) return;
    let obj = autoCompleteOption.value.filter(val => val.label === value);
    if (!obj[0]) return;
    if (onchange) onchange(obj[0].value);
  }, [value]);

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = ({ value }: any) => {
    //setting getter method to be handled inside the autosuggest
    //@ts-ignore
    suggestions = getSuggestions(value);
    let newSugs = Array.from(suggestions);
    setSuggestions(() => newSugs);
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: autoCompleteOption.placeHolder,
    value,
    onChange: onChange
  };

  const renderInputComponent = (inputProps: any) => (
    <div className="tripleform--autocomplete-formgroup form-group">
      {autoCompleteOption.label ? (
        <>
          <label> {autoCompleteOption.label} </label>
          <br></br>
        </>
      ) : null}
      {autoCompleteOption.required ? (
        <>
        <div className="input-group mb-3 autocomplete--input-group">
          { autoCompleteOption.prepend ? <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">{autoCompleteOption.prepend}</span>
        </div> : null}
        <input
          className="form-control"
          style={{
            border: `1px solid ${
              autoCompleteOption.value.filter(selObj => selObj.label === value)
                .length !== 0
                ? "#28a745"
                : "#dc3545"
            }`
          }}
          type="text"
          {...inputProps}
        /></div>
        {autoCompleteOption.small ? <small className="form-text text-muted">{autoCompleteOption.small}</small> : null}
        </>
      ) : (<>
      <div className="input-group mb-3 autocomplete--input-group">
        { autoCompleteOption.prepend ? <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">{autoCompleteOption.prepend}</span>
        </div> : null}
        <input
          className="form-control"
          style={{ border: `1px solid #28a745` }}
          type="text"
          {...inputProps}
        /></div>
        {autoCompleteOption.small ? <small className="form-text text-muted">{autoCompleteOption.small}</small> : null}
        </>
      )}
    </div>
  );

  return (
    <LocalStorageApplier
      onChange={val => setValue(val)}
      value={value}
      storageKey={localStorageKey}
    >
        <Autosuggest
          id={id}
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          renderInputComponent={renderInputComponent}
        />
    </LocalStorageApplier>
  );
};

export default AutoComplete;
