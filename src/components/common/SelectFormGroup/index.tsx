import React from "react";
import { SelectInput } from "../../../@types/types"

interface props {
    options: SelectInput,
    handleGetSelection?: (selection: string) => void;
    onChange?: (evt:any) => void
}

const SelectFormGroup:React.FC<props> = ({options, handleGetSelection, onChange}) => {

    const [selectedVal, setSelectedVal] = React.useState<string | number>("");

    const handleSelection = (evt: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedVal(evt.currentTarget.value);
            if(handleGetSelection)handleGetSelection(selectedVal as string);
            if(onChange)onChange(evt.currentTarget.value);
    } 

  return (
    <div className="form-group">
        <label>Example multiple select - Selected value = {selectedVal}</label>
      <select className="form-control" value={selectedVal} onChange={(evt)=>handleSelection(evt)}>
        <option key={`SelectFormGroup_option_-1`}>-</option>
        {options.value.map((option, index) => (
            <option key={`SelectFormGroup_option_${index}`} value={option.value}>{ option.label }</option>
        ))}
      </select>
    </div>
  );
};

export default SelectFormGroup;
