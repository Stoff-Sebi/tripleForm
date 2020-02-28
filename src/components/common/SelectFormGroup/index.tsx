import React from "react";
import { SelectInput } from "../../../@types/types";
import LocalStorageApplier from "../LocalStorageApplier";

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

  React.useEffect(() => {
    if (
      selectedVal === "" ||
      selectedVal === undefined ||
      selectedVal === "undefined" ||
      selectedVal === null
    )
      return;
    onChange(selectedVal);
  }, [selectedVal]);

  const handleSelection = (value: string) => {
    setSelectedVal(value);
  };

  return (
    <div className="form-group tripleform--selectformgroup">
      <LocalStorageApplier
        value={selectedVal}
        onChange={val => handleSelection(val)}
        storageKey={localStorageKey}
      >
        {options.label ? <label>{options.label}</label> : null}
        <select
          required={options.required}
          className="form-control"
          value={selectedVal}
          onChange={evt => handleSelection(evt.currentTarget.value)}
        >
          <option key={`SelectFormGroup_option_-1`} value="">
            {options.placeHolder}
          </option>
          {options.value.map((option, index) => (
            <option
              key={`SelectFormGroup_option_${index}`}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </LocalStorageApplier>
      {options.small ? (
        <small className="form-text text-muted">{options.small}</small>
      ) : null}
    </div>
  );
};

export default SelectFormGroup;
