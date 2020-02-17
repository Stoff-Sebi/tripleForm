import React from "react";

interface props {
    options: {value: string, label: string}[]
}

const SelectFormGroup:React.FC<props> = ({options}) => {
  return (
    <div className="form-group">
      <label>Example multiple select</label>
      <select className="form-control">
        {options.map((option, index) => (
            <option key={`SelectFormGroup_option_${index}`} value={option.value}>{ option.label }</option>
        ))}
      </select>
    </div>
  );
};

export default SelectFormGroup;
