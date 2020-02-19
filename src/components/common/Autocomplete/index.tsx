import React from "react";
import Autosuggest from 'react-autosuggest';
import { AutcompleteInput } from "../../../@types/types"

interface Props {
  id: string,
  autoCompleteOption: AutcompleteInput,
  onchange?: (evt:any) => void
}

const AutoComplete: React.FC<Props> = ({id, autoCompleteOption, onchange=undefined}) => {

    const [value, setValue] = React.useState<string>("");

    const [linkedObject, setLinkedObject] = React.useState<Object | undefined>(undefined);

    //needs to be let because getter has to be set!
    let [suggestions, setSuggestions] = React.useState<string[]>([]);

    const getSuggestions = (value: string) => {
      const inputValue = value.trim().toLowerCase();
      const inputLength = inputValue.length;
      return inputLength === 0 ? [] : autoCompleteOption.value.filter(lang =>
        lang.label.toLowerCase().slice(0, inputLength) === inputValue
      );
    };
  
  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  const getSuggestionValue = (suggestion: any) => {
      console.log("getSuggestionValue: ",suggestion);
      return suggestion.label
  };
  
  // Use your imagination to render suggestions.
  const renderSuggestion = (suggestion: any) => { 
      console.log("RenderSuggestion: ", suggestion)
      return (
      <div>
        <span style={{color:"red"}}>{suggestion.label[0]}</span>
        <span>{suggestion.label.substring(1,suggestion.label.length)}</span>
      </div>
      )
  }

    const onChange = (event: any, { newValue }: any) => {
        setValue(newValue);
    };

    React.useEffect(()=>{
        if(!value)return;
        let obj = autoCompleteOption.value.filter(val => val.label===value);
        if(!obj[0])return;
        setLinkedObject(obj[0]);
        if(onchange)onchange(obj[0].value);
    }, [value]);

    
    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    const onSuggestionsFetchRequested = ({ value }: any) => {
        console.log("onSuggestionsFetchRequested:", value);
        //setting getter method to be handled inside the autosuggest
        //@ts-ignore
        suggestions = getSuggestions(value);
        let newSugs = Array.from(suggestions);
        
        console.log(newSugs);
        setSuggestions(()=>newSugs);
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
        <div>
          {autoCompleteOption ? <><label> {autoCompleteOption.label} </label><br></br></> : null}
          <input required style={{border:`1px solid ${value ? '#28a745' : '#dc3545'}`}} type="text" {...inputProps} />
        </div>
    );

    return (
        <>
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
      <span>Gewählt: { 
        //@ts-ignore
        (linkedObject && linkedObject.value) ? `Name: ${linkedObject.label} | Jahr: ${linkedObject.value}` : null}</span>
        <br></br>
      </>
    )

}

export default AutoComplete;