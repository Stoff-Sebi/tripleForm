import React from "react";
import { TextInput } from "../../../@types/types";
import LocalStorageInput from "../StorageInput";

interface props {
    options: TextInput;
    onChange: (value: string) => void;
    localStorageKey: string
}

const TextFormGroup: React.FC<props> = ({options, onChange, localStorageKey}) => {

    const [value, setValue] = React.useState<string>(options.value);

    React.useEffect(()=>{
        if(value === undefined || value === "undefined" || value === null)return;
        onChange(value);
    }, [value]);

    //small runtime validation to run only on mount
    React.useEffect(() => {
      if (options.type !== "text"){
        throw new TypeError(
            `Tried to generate a textInputFormGroup, which type is not set to 'text'. Input with label: ${options.label}`);}
      
      if (typeof options.value !== "string"){
        throw new TypeError(
        `You have to pass in a string, when the input type is set to 'text'. Error at input with label: ${options.label}`
      )}
    }, []);

    return (
    <div className="form-group tripleform--textformgroup">
        { options.label ? <label>{options.label}</label> : null}
        <LocalStorageInput
          localStorageKey={localStorageKey}
          required={options.required}
          className="form-control"
          type="text"
          id={options.id}
          placeholder={options.placeHolder}
          value={options.value}
          onChange={val => setValue(val)}
        ></LocalStorageInput>
        {options.small ? <small className="form-text text-muted">{options.small}</small> : null}
    </div>); 
}


export default TextFormGroup;