import React from "react";
import Autosuggest from 'react-autosuggest';

// Imagine you have a list of languages that you'd like to autosuggest.
const languages = [
    {
      name: 'C',
      year: 1972
    },
    {
      name: 'Elm',
      year: 2012
    },
    {
        name: 'Peter',
        year: 1932
      },
      {
        name: 'Pez',
        year: 1931
      },
      {
        name: 'Peanut',
        year: 19
      },
      {
        name: 'PETA',
        year: 132
      },  
  ];

const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : languages.filter(lang =>
      lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = (suggestion: any) => {
    console.log("getSuggestionValue: ",suggestion);
    return suggestion.name
};

// Use your imagination to render suggestions.
const renderSuggestion = (suggestion: any) => { 
    console.log("RenderSuggestion: ", suggestion)
    return (
    <div>
      <span style={{color:"red"}}>{suggestion.name[0]}</span>
      <span>{suggestion.name.substring(1,suggestion.name.length)}</span>
    </div>
    )
}

const AutoComplete: React.FC = () => {

    const [value, setValue] = React.useState<string>("");

    const [linkedObject, setLinkedObject] = React.useState<Object | undefined>(undefined);

    //needs to be let because getter has to be set!
    let [suggestions, setSuggestions] = React.useState<string[]>([]);

    const onChange = (event: any, { newValue }: any) => {
        setValue(newValue);
    };

    React.useEffect(()=>{
        if(!value)return;
        let x = languages.filter(val => val.name===value);
        if(!x[0])return;
        setLinkedObject(x[0]);
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
        placeholder: 'Type a programming language',
        value,
        onChange: onChange
    }; 

    //TODO need to pass in id via prop -> when multiple autocompletes!

    return (
        <>
        
        
        <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
      />
      <span>Gewählt: { 
        //@ts-ignore
        (linkedObject && linkedObject.year) ? `Name: ${linkedObject.name} | Jahr: ${linkedObject.year}` : null}</span>
        <br></br>
      </>
    )

}

export default AutoComplete;