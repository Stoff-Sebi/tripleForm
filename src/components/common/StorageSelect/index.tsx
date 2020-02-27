import React from "react";
import LocalStorageApplier from "../LocalStorageApplier";

interface Props {
  onChange: (value: string) => void;
  value: string;
  localStorageKey: string | false;
  [properties: string]: any;
}

const StorageSelect: React.FC<Props> = ({
  onChange,
  value,
  localStorageKey,
  ...properties
}) => {
  return (
    <>
      {/* <LocalStorageApplier>
        <select value={value} onChange={evt => onChange(evt.currentTarget.value)}>
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
      </LocalStorageApplier> */}
    </>
  );
};

export default StorageSelect;
