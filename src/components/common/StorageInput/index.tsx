import React from "react";
import LocalStorageApplier from "../LocalStorageApplier";

interface props {
  onChange: (value: string) => void;
  value: string;
  localStorageKey: string;
  [properties: string]: any
}

const StorageInput: React.FC<props> = ({
  onChange,
  value,
  localStorageKey,
  ...properties
}) => {

  return (
    <>
      <LocalStorageApplier
        storageKey={localStorageKey}
        value={value}
        onChange={(val)=>onChange(val)}
      >
        <input
          onChange={evt => onChange(evt.currentTarget.value)}
          value={value}
          {...properties} //spreads any further given properties
        ></input>
      </LocalStorageApplier>
    </>
  );
};

export default StorageInput;
