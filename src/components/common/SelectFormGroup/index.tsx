import React from "react";
import { SelectInput } from "../../../@types/types"

interface props {
    options: SelectInput,
    onChange?: (value: string) => void
}

const SelectFormGroup:React.FC<props> = ({options, onChange}) => {

    const [selectedVal, setSelectedVal] = React.useState<string>("");

    React.useEffect(()=>{
      if(selectedVal === undefined || selectedVal === "undefined" || selectedVal === null)return;
      if(onChange)onChange(selectedVal);
    }, [selectedVal]);

    const handleSelection = (evt: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedVal(evt.currentTarget.value);
    } 

  return (
    <div className="form-group tripleform--selectformgroup">
        <label>{options.label}</label>
      <select required={options.required} className="form-control" value={selectedVal} onChange={(evt)=>handleSelection(evt)}>
        <option key={`SelectFormGroup_option_-1`}></option>
        {options.value.map((option, index) => (
            <option key={`SelectFormGroup_option_${index}`} value={option.value}>{ option.label }</option>
        ))}
      </select>
        {options.small ? <small className="form-text text-muted">{options.small}</small> : null}
    </div>
  );
};

export default SelectFormGroup;
