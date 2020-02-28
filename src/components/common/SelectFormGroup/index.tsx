import React from "react";
import { SelectInput } from "../../../@types/types";
import StorageSelect from "../StorageSelect";

interface props {
  options: SelectInput;
  onChange: (value: string) => void;
  localStorageKey: string;
}

const SelectFormGroup: React.FC<props> = ({
  options,
  onChange,
  localStorageKey
}) => {
  // search for the corresponding value according to _selected property.
  const [selectedVal, setSelectedVal] = React.useState<string>(() => {
    let filtered = options.value.filter(val => val._selected === true);
    return filtered.length > 0 ? (filtered[0].value as string) : "";
  });

  const handleSelection = (value: string) => {
    //set selection intern - string of value.
    setSelectedVal(value);

    //communicate to above selection 
    let filtered = options.value.filter(val => val.value === value);
    let matched = filtered.length > 0 ? (filtered[0].value as string) : "";
    onChange(matched);
  };

  return (
    <div className="form-group tripleform--selectformgroup">
      {options.label ? <label>{options.label}</label> : null}
      <StorageSelect
        localStorageKey={localStorageKey}
        onChange={(val)=>handleSelection(val)}
        useLocaleStorage={true}
        options={options.value as {label: string, value: string}[]}
        value={selectedVal}
        // following props are spread to <select>
        placeHolder={options.placeHolder}
        className="form-control"
        required={options.required}
      ></StorageSelect>
      {options.small ? (
        <small className="form-text text-muted">{options.small}</small>
      ) : null}
    </div>
  );
};

export default SelectFormGroup;
