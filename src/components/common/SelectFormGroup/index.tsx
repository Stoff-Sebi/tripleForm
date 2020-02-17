import React from "react";

interface props {
    options: {value: string, label: string}[]
}

const SelectFormGroup:React.FC<props> = ({options}) => {
  return (
    <div className="form-group">
      <label>Example multiple select</label>
      <select multiple className="form-control">
        {options.map(option => (
            <option value={option.value}>{ option.label }</option>
        ))}
      </select>
    </div>
  );
};

export default SelectFormGroup;
